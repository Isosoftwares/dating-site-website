import React, { useContext } from "react";
import avatar from "../../assets/holder.png";
import { FaRegHeart, FaCamera, FaRegMessage, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Indicator, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PictureCarousel from "./PictureCarousel";
import StartConversationModal from "./StartConversationModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { SocketContext } from "../../context/SocketProvider";
import getLastSeenText from "../../utils/lastSeenDate";

function UserCard({ user }) {
  const axios = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const { activeUsers } = useContext(SocketContext);
  const queryClient = useQueryClient();


  const [openedViewPics, { open: openViewPic, close: closeViewPic }] =
    useDisclosure(false);

  const [openedStartConvo, { open: openStartConvo, close: closeStartConvo }] =
    useDisclosure(false);

  const currentYear = new Date().getFullYear();

   // get my profile
   const getMyProfile = async () => {
    return await axios.get(`/user/account/user/${auth?.userId}`);
  };
  const { isLoading: loadingProfileData, data: profileData } = useQuery({
    queryFn: getMyProfile,
    queryKey: [`client-${auth?.userId}`],
    keepPreviousData: true,
  });



  const likeUser = (data) => axios.post(`/user/like`, data);

  const { mutate: likeUserMutate, isPending: loadingLikeUser } =
    useMutation({
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
      userId: user?._id,
      action: profileData?.data?.user?.likes?.includes(user?._id) ? "dislike" : "like",
    };
    likeUserMutate(data);
  };

  const updateFavorites = (favorite) => {
    setAuth((prevAuth) => {
      const currentFavorites = prevAuth.favorites || [];
      return {
        ...prevAuth,
        favorites: currentFavorites.includes(favorite)
          ? currentFavorites.filter((item) => item !== favorite)
          : [...currentFavorites, favorite],
      };
    });
  };

  return (
    <div className="overflow-hidden bg-white rounded-md shadow-md">
      {/* Modals */}
      <Modal
        opened={openedViewPics}
        onClose={closeViewPic}
        centered
        transitionProps={{ duration: 200 }}
        overlayProps={{ backgroundOpacity: 0.7, blur: 3 }}
        withCloseButton={false}
      >
        <PictureCarousel user={user} closeModal={closeViewPic} />
      </Modal>

      <Modal
        opened={openedStartConvo}
        onClose={closeStartConvo}
        centered
        transitionProps={{ duration: 200 }}
        overlayProps={{ backgroundOpacity: 0.7, blur: 3 }}
        size="lg"
        withCloseButton={false}
      >
        <StartConversationModal user={user} closeModal={closeStartConvo} />
      </Modal>

      {/* Profile Image */}
      <div className="relative">
        <Link to={`/client/user/${user?._id}`}>
          <img
            src={user?.profileImg || avatar}
            alt="User"
            className="h-[260px] w-full object-cover"
          />
        </Link>
        <div className="absolute px-2 py-1 text-xs rounded-full shadow-md bottom-2 right-2 bg-white/90">
          {activeUsers.includes(user?._id) ? (
            <span className="font-semibold text-green-500">I'm Online</span>
          ) : (
            <span className="text-gray-600">
              {getLastSeenText(user?.lastSeen)}
            </span>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 bg-white">
        <Link to={`/client/user/${user?._id}`}>
          <h3 className="text-lg font-bold">{user?.userName}</h3>
        </Link>
        <p className="text-sm text-gray-600">
          <strong>{currentYear - user?.dob}</strong>{" "}
          {user?.town || user?.city
            ? `${user?.town}, ${user?.city}`
            : "Unknown location"}
        </p>
        <p className="text-sm">
          Seeking:{" "}
          <strong>
            {user?.interestedInGender}, {user?.seekingAge}
          </strong>
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3">
          <button
            disabled={loadingLikeUser}
            onClick={() => handleLikeUser()}
            className="p-1"
            title={profileData?.data?.user?.likes?.includes(user?._id) ? "Dislike" : "Like"}
          >
            {profileData?.data?.user?.likes?.includes(user?._id) ? (
              <FaHeart size={25} color="#FA812F" />
            ) : (
              <FaRegHeart size={25} color="#FA812F" />
            )}
          </button>
          <button onClick={() => openStartConvo()} className="p-1">
            <FaRegMessage size={25} color="#FA812F" />
          </button>
          <button
            onClick={user?.images?.length ? openViewPic : null}
            className="relative p-1"
          >
            <FaCamera size={25} color="#FA812F" />
            {user?.images?.length > 0 && (
              <span className="absolute px-2 text-xs bg-gray-200 rounded-full -bottom-2 -right-2">
                {user?.images?.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
