import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import avatar from "../assets/holder.png";
import { FaRegHeart } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { Avatar, Skeleton } from "@mantine/core";
import { BiArrowBack } from "react-icons/bi";
import { Carousel } from "@mantine/carousel";
import { CgProfile } from "react-icons/cg";

function ViewUser() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { _id } = useParams();
  const date = new Date();
  const year = date.getFullYear();

  const [
    openedUploadPic,
    { open: openUploadPic, close: closeUploadPic },
  ] = useDisclosure(false);

  // get user
  const getUser = async () => {
    return await axios.get(`/user/account/${_id}`);
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

  return (
    <div>
      {/* user info */}
      <div className="bg-primary/20  pt-[20px] md:pt-[20px] pb-6 px-3 md:px-8 xl:px-[100px] ">
        <Skeleton visible={loadingUser}>
          <div className="flex flex-col  gap-4 justify-center items-center">
            {/* profile */}
            <div className="flex gap-5 items-center  ">
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
                    title="Message"
                    className="p-1 cursor-pointer "
                  >
                    {" "}
                    <FaRegMessage size={27} color="#FA812F" />
                  </span>
                  <span title="Like" className="p-1 cursor-pointer ">
                    {" "}
                    <FaRegHeart size={30} color="#FA812F" />
                  </span>
                  <span title="Favorite" className="p-1 cursor-pointer ">
                    {" "}
                    <FaRegStar size={30} color="#FA812F" />
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
          className="flex items-center gap-1 text-secondary cursor-pointer"
        >
          <BiArrowBack />
          <p className="font-bold">Return Back</p>
        </div>

        {/*  */}
        <div className="flex flex-col-reverse md:flex-row gap-2 md:px-[30px] lg:px-[150px] ">
          {/* images */}
          <Skeleton visible={loadingUser}>
            <div className="w-full flex items-center">
              <div className="w-full md:max-w-[400px] rounded-md">
                {!userData?.data?.user?.images?.length ? (
                  <div className="bg-light max-h-[400px] relative ">
                    <img src={avatar} alt="" className="max-h-[350px]" />
                    <p className="italic absolute top-3 left-2 text-gray-500 ">No photos uploaded</p>
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
                  Last seen: <span className="font-bold">5 hrs ago</span>
                </p>
                <p className="border px-2 rounded  ">
                  {userData?.data?.user?.description}this is some description
                  about the user please read the full of it and reave a comment
                  cool!
                </p>
                <div className="flex gap-2 items-center mt-5 mb-5">
                  <button className="bg-secondary px-3 rounded-md text-light hover:bg-opacity-80  ">
                    Send Message
                  </button>
                  <button className="bg-secondary px-8 rounded-md text-light hover:bg-opacity-80  ">
                    Like{" "}
                  </button>
                  <button className="bg-secondary px-3 rounded-md text-light hover:bg-opacity-80  ">
                    Add Favorite{" "}
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
            <p className="font-bold text-lg  border-b-2 border-b-secondary  my-2">
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
                      <span className="font-bold text-sm capitalize mx-1 bg-gray-600 px-3 text-light rounded-full py-1  ">
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
            <p className="font-bold text-lg  border-b-2 border-b-secondary  my-2">
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
