import React from "react";
import avatar from "../../../assets/avatar.png";
import { FaRegHeart, FaCamera } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Avatar, Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PictureCarousel from "../../components/PictureCarousel";

function UserCardFavorites({ user }) {
  const [
    openedViewPics,
    { open: openViewPic, close: closeViewPic },
  ] = useDisclosure(false);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="bg-gradient-to-t from-[#cce3e9] to-[#ffffff] px-2 py-2 rounded-md shadow-sm w-full ">
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
      <div className="flex gap-2 w-full">
        <div className=" overflow-hidden relative rounded-t-md">
          <Link to={`/client/user/${user?._id}`}>
            <Avatar
              src={user?.profileImg ? user?.profileImg : avatar}
              size={"xl"}
            />
          </Link>
        </div>
        <div className="px-2 py-3  ">
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
            <div>
              <p className="font-bold">
                Added: <span>4 hrs ago</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div>
          <Link to={`/client/user/${user?._id}`} className="primary-btn">
            {" "}
            View User
          </Link>
        </div>
        <div>
          {user?.images?.length ? (
            <button
              onClick={() => {
                if (user?.images?.length) {
                  openViewPic();
                }
              }}
              className="px-4 rounded-md border border-secondary hover:bg-secondary/30"
            >
              Photos {user?.images?.length ? user?.images?.length : ""}
            </button>
          ) : (
            <span className="text-xs">No photos uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCardFavorites;
