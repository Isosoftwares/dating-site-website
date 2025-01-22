import { MonthPickerInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Modal, Skeleton } from "@mantine/core";
import useAuth from "../hooks/useAuth";
import { CiCirclePlus } from "react-icons/ci";
import { useDisclosure } from "@mantine/hooks";
import avatar from "../assets/avatar.png";
import { FaRegHeart } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import OverviewProfiles from "./components/OverviewProfiles";
import UploadProfilePic from "./components/UploadProfilePic";

function ClientOverview() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [
    openedUploadPic,
    { open: openUploadPic, close: closeUploadPic },
  ] = useDisclosure(false);

  // get user
  const getUser = async () => {
    return await axios.get(`/user/account/user/${auth?.userId}`);
  };
  const {
    isLoading: loadingUser,
    data: userData,
    refetch: refetcUser,
    isRefetching: refetchingUser,
    error: errorData,
  } = useQuery({
    queryFn: getUser,
    queryKey: [`client-${auth?.userId}`],
    keepPreviousData: true,
  });

  // get my profile
  const getMyProfileStats = async () => {
    return await axios.get(`/user/profile-stats/${auth?.userId}`);
  };
  const {
    isLoading: loadingProfileDataStats,
    data: profileDataStats,
  } = useQuery({
    queryFn: getMyProfileStats,
    queryKey: [`client-profile-stats-${auth?.userId}`],
    keepPreviousData: true,
  });

  return (
    <div className="">
      <Modal
        opened={openedUploadPic}
        onClose={closeUploadPic}
        title="Upload Profile Picture"
      >
        <UploadProfilePic userId={auth?.userId} closeModal={closeUploadPic} />
      </Modal>
      {/* user info */}
      <div className="bg-primary/20  pt-[40px] md:pt-[60px] pb-14 px-3 md:px-8 xl:px-[100px] ">
        <Skeleton visible={loadingUser}>
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* profile */}
            <div className="flex w-full gap-5">
              <div>
                <Avatar
                  size="xl"
                  radius="xl"
                  src={auth?.imgUrl ? auth?.imgUrl : avatar}
                />
              </div>
              <div>
                <p>
                  Hello, <span className="font-bold">{auth?.userName}</span>
                </p>
                <div>
                  <Link to={"/client/upgrade"}>
                    <p className="px-6 text-center rounded-md shadow-xl cursor-pointer text-light bg-secondary ">
                      Upgrade to premium{" "}
                    </p>
                  </Link>
                  <div className="flex flex-col gap-3 mt-4 md:flex-row ">
                    <span
                      onClick={openUploadPic}
                      className="text-gray-700 underline cursor-pointer text-md "
                    >
                      {" "}
                      Add Profile Picture{" "}
                    </span>
                    <Link
                      to={"/client/edit-profile"}
                      className="text-gray-700 underline cursor-pointer text-md "
                    >
                      Update Your Match Info
                    </Link>
                  </div>
                  <div className="flex flex-col gap-3 mt-4 md:flex-row ">
                    <span className={`  cursor-pointer text-md `}>
                      Location:{" "}
                      <span
                        className={`${
                          !userData?.data?.user?.town &&
                          !userData?.data?.user?.city
                            ? "text-secondary font-bold"
                            : "text-gray-900 font-bold"
                        }`}
                      >
                        {!userData?.data?.user?.town &&
                        !userData?.data?.user?.city
                          ? "Not Added"
                          : `${userData?.data?.user?.town}, ${userData?.data?.user?.city} `}
                      </span>
                    </span>
                    <Link
                      to={"/client/edit-profile"}
                      className="text-gray-700 underline cursor-pointer text-md "
                    >
                      Update Location
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* other details */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                <Link>
                  <div className="bg-[#edf7ed] flex  gap-4 rounded-md cursor-pointer">
                    <span className="px-4 py-3 bg-primary/80 rounded-l-md ">
                      <FaRegMessage size={30} color="#FEF3E2" />
                    </span>
                    <div className="mt-3">
                      <p className="text-sm font-bold ">Messages</p>
                      <p className="text-center">0</p>
                    </div>
                  </div>
                </Link>
                <Link>
                  <div className="bg-[#edf7ed] flex  gap-4 rounded-md cursor-pointer">
                    <span className="bg-[#FA812F]/70 py-3 px-4 rounded-l-md ">
                      <FaRegHeart size={30} color="#FEF3E2" />
                    </span>
                    <div className="mt-3">
                      <p className="text-sm font-bold ">Likes</p>
                      <p className="text-center">
                        {profileDataStats?.data?.totalLikes || 0}
                      </p>
                    </div>
                  </div>
                </Link>
                <Link>
                  <div className="bg-[#edf7ed] flex  gap-4 rounded-md cursor-pointer">
                    <span className="bg-[#161D6F]/80 py-3 px-4 rounded-l-md ">
                      <IoEyeOutline size={30} color="#FEF3E2" />
                    </span>
                    <div className="mt-3">
                      <p className="text-sm font-bold ">Views</p>
                      <p className="text-center">
                        {profileDataStats?.data?.totalProfileViews || 0}
                      </p>
                    </div>
                  </div>
                </Link>
                <Link>
                  <div className="bg-[#edf7ed] flex  gap-4 rounded-md cursor-pointer">
                    <span className="bg-[#3D0301]/80 py-3 px-4 rounded-l-md ">
                      <FaRegStar size={30} color="#FEF3E2" />
                    </span>
                    <div className="mt-3">
                      <p className="text-sm font-bold ">Favorites</p>
                      <p className="text-center">
                        {profileDataStats?.data?.totalFavorited || 0}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      {/* profiles */}
      <div>
        <OverviewProfiles />
      </div>
    </div>
  );
}

export default ClientOverview;
