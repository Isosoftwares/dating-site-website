import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Skeleton } from "@mantine/core";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import { Carousel } from "@mantine/carousel";
import avatar from "../assets/holder.png";
import { useDisclosure } from "@mantine/hooks";
import { RiDeleteBin5Fill } from "react-icons/ri";

function ClientProfile() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const { auth } = useAuth();
  const axios = useAxiosPrivate();
  const [filePath, setFilePath] = useState("");
  const logout = useLogout();

  // Fetch user details
  const getUser = async () => {
    return await axios.get(`/user/account/user/${_id}`);
  };

  const { isLoading, data: userData } = useQuery({
    queryFn: getUser,
    queryKey: [`user-${_id}`],
    keepPreviousData: true,
  });

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  if (
    userData?.data?.user?.profileImg &&
    !userData?.data?.user?.images.includes(userData?.data?.user?.profileImg)
  ) {
    userData?.data?.user?.images.push(userData?.data?.user?.profileImg);
  }

  const user = userData?.data?.user;

  const slides = user?.images.map((url) => (
    <Carousel.Slide key={url}>
      <div className="relative group ">
        <img
          src={url}
          loading="lazy"
          alt=""
          className=" max-h-[400px]  w-full object-cover rounde "
        />
      </div>
    </Carousel.Slide>
  ));

  return (
    <div>
      <h1 className="font-bold text-lg "> Users Profile </h1>

      <div className="mb-6">
        <Skeleton visible={isLoading}>
          <div className="flex flex-col md:flex-row gap-6 bg-white rounded-md shadow-md p-6">
            <div className="  flex-1">
              <div>
                <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-2">
                  Profile
                </h3>

                <div>
                  <img
                    src={user?.profileImg || avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mb-4 shadow-md shadow-secondary border-2"
                  />
                </div>
                <div>
                  <p className="text-gray-600">
                    Name:{" "}
                    <span className="font-bold">
                      {user?.userName || "Not Provided"}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Email:{" "}
                    <span className="font-bold">
                      {user?.email || "Not Provided"}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Date of Birth:{" "}
                    <span className="font-bold">
                      {user?.dob || "Not Provided"}
                    </span>
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Status:</p>
                    <span
                      className={
                        user?.status === "Active"
                          ? "text-primary font-bold bg-primary/30 text-center rounded-md px-3  "
                          : "text-red-500 font-bold bg-red-500/30 text-center rounded-md px-3  "
                      }
                    >
                      {user?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* photos */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-secondary  border-b border-b-secondary mb-2">
                User photos
              </h3>
              <Skeleton visible={isLoading}>
                <div className="w-full flex items-center">
                  <div className="w-full md:max-w-[400px] rounded-md">
                    {!user?.images?.length ? (
                      <div className="bg-light max-h-[400px] relative ">
                        <img src={avatar} alt="" className="max-h-[350px]" />
                        <p className="italic absolute top-3 left-2 text-gray-500 ">
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
            </div>
          </div>
        </Skeleton>

        {/* Personality and More Info Section */}
        <Skeleton visible={isLoading}>
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Personality Section */}
            <div className="bg-white p-6 rounded-md shadow-md flex-1">
              <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-2">
                Personality
              </h3>
              <p className="text-gray-600">
                Gender:{" "}
                <span className="font-bold">
                  {user?.gender || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Interested In:{" "}
                <span className="font-bold">
                  {user?.interestedInGender || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Ethnicity:{" "}
                <span className="font-bold">
                  {user?.ethnicity || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Hair Color:{" "}
                <span className="font-bold">
                  {user?.hairColor || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Eye Color:{" "}
                <span className="font-bold">
                  {user?.eyeColor || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Body Type:{" "}
                <span className="font-bold">
                  {user?.bodyType || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Height:{" "}
                <span className="font-bold">
                  {user?.height || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Weight:{" "}
                <span className="font-bold">
                  {user?.weight || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Languages Spoken:{" "}
                <span className="font-bold">
                  {user?.languageSpoken?.join(", ") || "Not Specified"}
                </span>
              </p>
            </div>

            {/* More Info Section */}
            <div className="bg-white p-6 rounded-md shadow-md flex-1">
              <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-2">
                More Info
              </h3>
              <p className="text-gray-600">
                Status:{" "}
                <span className="font-bold">
                  {user?.status || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Marital Status:{" "}
                <span className="font-bold">
                  {user?.maritalStatus || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Type of Relationship:{" "}
                <span className="font-bold">
                  {user?.typeOfRelationship || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Occupation:{" "}
                <span className="font-bold">
                  {user?.occupation || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Religion:{" "}
                <span className="font-bold">
                  {user?.religion || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Looking For:{" "}
                <span className="font-bold">
                  {user?.whatAmLookingFor || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Description:{" "}
                <span className="font-bold">
                  {user?.description || "Not Specified"}
                </span>
              </p>
              <p className="text-gray-600">
                Tags:{" "}
                <span className="font-bold">
                  {user?.tags?.join(", ") || "No Tags"}
                </span>
              </p>
            </div>
          </div>
        </Skeleton>
        <Skeleton visible={isLoading}>
          {/* Location Section */}
          <div className="bg-white p-6 mt-4 rounded-md shadow-md flex-1">
            <h3 className="text-lg font-semibold text-secondary border-b border-b-secondary mb-2">
              Location
            </h3>
            <p className="text-gray-600">
              Country:{" "}
              <span className="font-bold">
                {user?.country || "Not Provided"}
              </span>
            </p>
            <p className="text-gray-600">
              City:{" "}
              <span className="font-bold">{user?.city || "Not Provided"}</span>
            </p>
            <p className="text-gray-600">
              Town:{" "}
              <span className="font-bold">{user?.town || "Not Provided"}</span>
            </p>
            <p className="text-gray-600">
              Coordinates:{" "}
              <span className="font-bold">
                {user?.liveLocation?.coordinates?.join(", ") || "Not Provided"}
              </span>
            </p>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default ClientProfile;
