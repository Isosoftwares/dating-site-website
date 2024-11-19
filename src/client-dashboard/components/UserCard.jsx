import React from "react";
import avatar from "../../assets/holder.png";
import { FaRegHeart, FaCamera } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PictureCarousel from "./PictureCarousel";
import StartConversationModal from "./StartConversationModal";

function UserCard({ user }) {
  const [openedViewPics, { open: openViewPic, close: closeViewPic }] =
    useDisclosure(false);

  const [openedStartConvo, { open: openStartConvo, close: closeStartConvo }] =
    useDisclosure(false);

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="rounded-md shadow-sm bg-light ">
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

      {/* start conversation modal */}
      <Modal
        opened={openedStartConvo}
        onClose={closeStartConvo}
        centered
        transitionProps={{ duration: 200 }}
        overlayProps={{
          backgroundOpacity: 0.7,
          blur: 3,
        }}
        size={"lg"}
        withCloseButton={false}
      >
        <StartConversationModal user={user} closeModal={closeStartConvo} />
      </Modal>
      <div className="relative overflow-hidden rounded-t-md">
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
            <span
              onClick={() => {
                openStartConvo();
              }}
              className="p-1 cursor-pointer "
            >
              {" "}
              <FaRegMessage size={25} color="#FA812F" />
            </span>
            <span
              onClick={() => {
                if (user?.images?.length) {
                  openViewPic();
                }
              }}
              className="relative p-1 cursor-pointer "
            >
              {" "}
              <FaCamera size={25} color="#FA812F" />
              <span className="absolute text-xs text-secondary -bottom-1 -right-1">
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
