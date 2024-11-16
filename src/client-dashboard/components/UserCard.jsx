import React from "react";
import avatar from "../../assets/holder.png";
import { FaRegHeart, FaCamera } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PictureCarousel from "./PictureCarousel";

function UserCard({ user }) {
  const [
    openedViewPics,
    { open: openViewPic, close: closeViewPic },
  ] = useDisclosure(false);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-light rounded-md shadow-sm ">
      <Modal
        opened={openedViewPics}
        onClose={closeViewPic}
        centered
        transitionProps={{ duration: 200 }}
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 3,
        }}
        withCloseButton={false}
      >
        <PictureCarousel user={user} closeModal={closeViewPic} />
      </Modal>
      <div className=" overflow-hidden relative rounded-t-md">
        <Link to={`/client/user/${user?._id}`}>
          <img
            src={user?.profileImg ? user?.profileImg : avatar}
            alt=""
            className=" h-[260px] object-cover w-full "
          />
        </Link>
      </div>
      <div className="px-2 relative py-3 bg-gradient-to-t from-[#8ce6ff] to-[#ffffff] rounded-b-md ">
        <div className="absolute top-0 right-3 ">
          <Indicator color="green" inline></Indicator>
        </div>
        <div>
          <Link to={`/client/user/${user?._id}`}>
            <p className="font-bold">{user?.userName}</p>
          </Link>

          <p>
            <span className="font-bold">{year - user?.dob}</span>{" "}
            {!user?.town && !user?.city ? (
              <span className="text-red-300"> Location Not Added</span>
            ) : (
              `${user?.town}, ${user?.city} `
            )}
          </p>
          <p>
            Seeking:{" "}
            <span className="font-bold">
              {" "}
              {user?.interestedInGender},{" "}
              <span className="font-bold">{user?.seekingAge}</span>{" "}
            </span>
          </p>
          <div className="flex justify-between">
            <span className="p-1 cursor-pointer ">
              {" "}
              <FaRegHeart size={25} color="#FA812F" />
            </span>
            <span className="p-1 cursor-pointer ">
              {" "}
              <FaRegMessage size={25} color="#FA812F" />
            </span>
            <span
              onClick={() => {
                if (user?.images?.length) {
                  openViewPic();
                }
              }}
              className="p-1 cursor-pointer relative "
            >
              {" "}
              <FaCamera size={25} color="#FA812F" />
              <span className=" absolute text-xs text-secondary -bottom-1 -right-1  ">
                {user?.images?.length ? user?.images?.length : ""}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;