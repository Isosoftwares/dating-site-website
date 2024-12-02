import React, { useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import avatar from "../assets/holder.png";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Avatar, Modal, Skeleton } from "@mantine/core";
import { BiArrowBack } from "react-icons/bi";
import { Carousel } from "@mantine/carousel";
import { CgProfile } from "react-icons/cg";
import { SocketContext } from "../context/SocketProvider";
import getLastSeenText from "../utils/lastSeenDate";
import StartConversationModal from "./components/StartConversationModal";
import { FaHeart, FaRegMessage, FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";

function ViewUser() {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { _id } = useParams();
  const date = new Date();
  const year = date.getFullYear();
  const { activeUsers } = useContext(SocketContext);
  const { auth, setAuth } = useAuth();
  const queryClient = useQueryClient();

  const [openedUploadPic, { open: openUploadPic, close: closeUploadPic }] =
    useDisclosure(false);

  const [openedStartConvo, { open: openStartConvo, close: closeStartConvo }] =
    useDisclosure(false);

  // get my profile
  const getMyProfile = async () => {
    return await axios.get(`/user/account/user/${auth?.userId}`);
  };
  const { isLoading: loadingProfileData, data: profileData } = useQuery({
    queryFn: getMyProfile,
    queryKey: [`client-${auth?.userId}`],
    keepPreviousData: true,
  });

  // get user
  const getUser = async () => {
    return await axios.get(`/user/view-profile/${auth?.userId}/${_id}`);
  };
  const {
    isLoading: loadingUser,
    data: userData,
    refetch: refetcUser,
    isRefetching: refetchingUser,
    error: errorData,
  } = useQuery({
    queryFn: getUser,
    queryKey: [`client-${_id}`],
    keepPreviousData: true,
  });

  if (
    userData?.data?.user?.profileImg &&
    !userData?.data?.user?.images.includes(userData?.data?.user?.profileImg)
  ) {
    userData?.data?.user?.images.push(userData?.data?.user?.profileImg);
  }

  const slides = userData?.data?.user?.images.map((url) => (
    <Carousel.Slide key={url}>
      <img
        src={url}
        loading="lazy"
        alt=""
        className=" max-h-[500px]  w-full object-cover rounde "
      />
    </Carousel.Slide>
  ));

  const favoriteUser = (data) => axios.post(`/user/favorite`, data);

  const { mutate: favoriteUserMutate, isPending: loadingFavoriteUser } =
    useMutation({
      mutationFn: favoriteUser,
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        queryClient.invalidateQueries([`client-${auth?.userId}`]);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message);
      },
    });

  const handleFavoriteUser = () => {
    const data = {
      currentUserId: auth?.userId,
      userId: _id,
      action: profileData?.data?.user?.favorites?.includes(_id)
        ? "unfavorite"
        : "favorite",
    };
    favoriteUserMutate(data);
  };

  const likeUser = (data) => axios.post(`/user/like`, data);

  const { mutate: likeUserMutate, isPending: loadingLikeUser } = useMutation({
    mutationFn: likeUser,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      queryClient.invalidateQueries([`client-${auth?.userId}`]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const handleLikeUser = () => {
    const data = {
      currentUserId: auth?.userId,
      userId: _id,
      action: profileData?.data?.user?.likes?.includes(_id)
        ? "dislike"
        : "like",
    };
    likeUserMutate(data);
  };

  return (
    <div>
      <Modal
        opened={openedStartConvo}
        onClose={closeStartConvo}
        centered
        transitionProps={{ duration: 200 }}
        overlayProps={{ backgroundOpacity: 0.7, blur: 3 }}
        size="lg"
        withCloseButton={false}
      >
        <StartConversationModal
          user={userData?.data?.user}
          closeModal={closeStartConvo}
        />
      </Modal>
      {/* user info */}
      <div className="bg-primary/20  pt-[20px] md:pt-[20px] pb-6 px-3 md:px-8 xl:px-[100px] ">
        <Skeleton visible={loadingUser}>
          <div className="flex flex-col items-center justify-center gap-4">
            {/* profile */}
            <div className="flex items-center gap-5 ">
              <div>
                <Avatar
                  size="xl"
                  radius="xl"
                  src={
                    userData?.data?.user?.profileImg
                      ? userData?.data?.user?.profileImg
                      : avatar
                  }
                />
              </div>
              <div>
                <p>
                  <span className="font-bold">
                    {userData?.data?.user?.userName}
                  </span>
                </p>
                <div>
                  <p>
                    <span className="font-bold">
                      {year - userData?.data?.user?.dob}
                    </span>{" "}
                    {!userData?.data?.user?.town &&
                    !userData?.data?.user?.city ? (
                      <span className="text-red-300"> Location Not Added</span>
                    ) : (
                      `${userData?.data?.user?.town}, ${userData?.data?.user?.city} `
                    )}
                  </p>
                </div>
                <div className="flex justify-center gap-4">
                  <span
                    onClick={() => openStartConvo()}
                    title="Message"
                    className="p-1 cursor-pointer "
                  >
                    {" "}
                    <FaRegMessage size={27} color="#FA812F" />
                  </span>
                  <span className="p-1 cursor-pointer ">
                    <button
                      disabled={loadingLikeUser}
                      onClick={() => handleLikeUser()}
                      className="p-1"
                      title={
                        profileData?.data?.user?.likes?.includes(_id)
                          ? "Dislike"
                          : "Like"
                      }
                    >
                      {profileData?.data?.user?.likes?.includes(_id) ? (
                        <FaHeart size={25} color="#FA812F" />
                      ) : (
                        <FaRegHeart size={25} color="#FA812F" />
                      )}
                    </button>
                  </span>
                  <span lassName="p-1 cursor-pointer ">
                    <button
                      disabled={loadingFavoriteUser}
                      onClick={() => handleFavoriteUser()}
                      className="p-1 cursor-pointer "
                      title={
                        profileData?.data?.user?.favorites?.includes(_id)
                          ? "Remove"
                          : "Favorite"
                      }
                    >
                      {profileData?.data?.user?.favorites?.includes(_id) ? (
                        <FaStar size={26} color="#FA812F" />
                      ) : (
                        <FaRegStar size={26} color="#FA812F" />
                      )}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      {/*  */}
      <div className="px-3 md:px-8 xl:px-[100px] mt-2">
        {/* back btn */}
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-1 cursor-pointer text-secondary"
        >
          <BiArrowBack />
          <p className="font-bold">Return Back</p>
        </div>

        {/*  */}
        <div className="flex flex-col-reverse md:flex-row gap-2 md:px-[30px] lg:px-[150px] ">
          {/* images */}
          <Skeleton visible={loadingUser}>
            <div className="flex items-center w-full">
              <div className="w-full md:max-w-[400px] rounded-md">
                {!userData?.data?.user?.images?.length ? (
                  <div className="bg-light max-h-[400px] relative ">
                    <img src={avatar} alt="" className="max-h-[350px]" />
                    <p className="absolute italic text-gray-500 top-3 left-2 ">
                      No photos uploaded
                    </p>
                  </div>
                ) : (
                  <Carousel
                    loop
                    withIndicators
                    align={"center"}
                    height={"auto"}
                    className="border-[2px] border-secondary rounded-md shadow-md "
                  >
                    {slides}
                  </Carousel>
                )}
              </div>
            </div>
          </Skeleton>
          {/* details */}
          <Skeleton visible={loadingUser}>
            <div className="w-full border rounded-md shadow-sm px-4 bg-white min-h-[200px] ">
              <div>
                <div className="flex items-center gap-1 text-secondary ">
                  <span>
                    <CgProfile />
                  </span>
                  <span className="font-bold ">
                    {userData?.data?.user?.userName}
                  </span>
                </div>
                <p className="font-bold">
                  {userData?.data?.user?.gender},{" "}
                  <span className="font-bold">
                    {year - userData?.data?.user?.dob}{" "}
                  </span>{" "}
                </p>
                <p>
                  {!userData?.data?.user?.town &&
                  !userData?.data?.user?.city ? (
                    <span className="text-red-300"> Location Not Added</span>
                  ) : (
                    <span className="font-bold">{`${userData?.data?.user?.town}, ${userData?.data?.user?.city} `}</span>
                  )}
                </p>
                <p>
                  Seeking:{" "}
                  <span className="font-bold">
                    {userData?.data?.user?.interestedInGender},{" "}
                    {userData?.data?.user?.seekingAge} yrs{" "}
                    <span className="font-bold">
                      {userData?.data?.user?.typeOfRelationship &&
                        ` for ${userData?.data?.user?.typeOfRelationship}`}
                    </span>
                  </span>
                </p>
                <p>
                  {activeUsers?.includes(_id) ? (
                    <span className="font-semibold text-green-500">
                      I'm Online
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      Last Seen:{" "}
                      {getLastSeenText(userData?.data?.user?.lastSeen)}
                    </span>
                  )}
                </p>
                <p className="px-2 border rounded ">
                  {userData?.data?.user?.description}this is some description
                  about the user please read the full of it and reave a comment
                  cool!
                </p>
                <div className="flex items-center gap-2 mt-5 mb-5">
                  <button
                    onClick={() => openStartConvo()}
                    className="px-3 rounded-md bg-secondary text-light hover:bg-opacity-80 "
                  >
                    Send Message
                  </button>
                </div>
                <div className="h-[100px]">
                  <p className="italic">Advert</p>
                </div>
              </div>
            </div>
          </Skeleton>
        </div>
        {/* <div>
          <p>advert</p>
        </div> */}

        {/* overviews */}
        <div className="flex flex-col md:flex-row gap-2 md:px-[30px] lg:px-[150px] mt-10 mb-5 ">
          <div className="bg-light  min-h-[200px] w-full border shadow-sm px-3 py-2   ">
            <p className="my-2 text-lg font-bold border-b-2 border-b-secondary">
              Personal Overview
            </p>
            <table>
              <tr>
                <td>Marital Status:</td>
                <td className="font-bold">
                  {userData?.data?.user?.maritalStatus || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Ethnicity:</td>
                <td className="font-bold">
                  {userData?.data?.user?.ethnicity || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Occupation:</td>
                <td className="font-bold">
                  {userData?.data?.user?.occupation || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Languanges:</td>
                <td className="font-bold">
                  {userData?.data?.user?.languageSpoken?.map((item, index) => {
                    return (
                      <span className="px-3 py-1 mx-1 text-sm font-bold capitalize bg-gray-600 rounded-full text-light ">
                        {item}
                      </span>
                    );
                  })}
                </td>
              </tr>
              <tr>
                <td>seeking:</td>
                <td className="font-bold">
                  {userData?.data?.user?.seeking || "Not Provided"}
                </td>
              </tr>
            </table>
          </div>
          <div className="bg-light  min-h-[200px] w-full border shadow-sm px-3 py-2   ">
            <p className="my-2 text-lg font-bold border-b-2 border-b-secondary">
              Appearance Overview
            </p>
            <table>
              <tr>
                <td>Body Type:</td>
                <td className="font-bold">
                  {userData?.data?.user?.bodyType || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Height:</td>
                <td className="font-bold">
                  {userData?.data?.user?.height || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>weight:</td>
                <td className="font-bold">
                  {userData?.data?.user?.weight || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Eye color:</td>
                <td className="font-bold">
                  {userData?.data?.user?.eyeColor || "Not Provided"}
                </td>
              </tr>
              <tr>
                <td>Hair Color:</td>
                <td className="font-bold">
                  {userData?.data?.user?.hairColor || "Not Provided"}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
