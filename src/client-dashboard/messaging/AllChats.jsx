import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Loader, Pagination } from "@mantine/core";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import avatar from "../../assets/avatar.png";
import useAuth from "../../hooks/useAuth";

function Support({ handleChatId, openedChatId }) {
  const axios = useAxiosPrivate();

  const [perPage, setPerPage] = useState(10);
  const [activePage, setPage] = useState(1);
  const [conversationId, setJabberId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const queryClient = useQueryClient();

  const { auth } = useAuth();

  const fetchMessages = () => {
    return axios.get(`/message/chats/${auth?.userId}`);
  };

  const {
    isLoading: loadingMessags,
    data: messageData,
    refetch,
    isRefetching: refetchingMessages,
  } = useQuery({
    queryKey: [`chats-${auth?.userId}`, activePage],
    queryFn: fetchMessages,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    refetchInterval: 10000,
  });

  const totalPages = Math.ceil(messageData?.data?.count / perPage) || 0;

  // pagination refetch
  useEffect(() => {
    refetch();
  }, [activePage, perPage, userName, conversationId, role]);

  function getOtherUserName(users, userId) {
    // Check if the array has more than two users
    if (!users?.length) {
      return "Group";
    }
    if (users?.length > 2) {
      return "Group";
    }

    // Find the user that does not match the given userId
    const otherUser = users.find((user) => user._id !== userId);

    // Return the username of the other user
    return otherUser ? otherUser.userName : null;
  }

  function getReceiverId(users, userId) {
    // Check if the array has more than two users
    if (!users?.length) {
      return null;
    }
    if (users?.length > 2) {
      return null;
    }

    // Find the user that does not match the given userId
    const otherUser = users.find((user) => user._id !== userId);

    // Return the username of the other user
    return otherUser ? otherUser._id : null;
  }

  function getOtherUserProfileImg(users, userId) {
    // Check if the array has more than two users
    if (!users?.length) {
      return "Group";
    }
    if (users?.length > 2) {
      return "Group";
    }

    // Find the user that does not match the given userId
    const otherUser = users.find((user) => user._id !== userId);

    // Return the username of the other user
    return otherUser ? otherUser.profileImg : null;
  }

  return (
    <div className="px-2 py-3 ">
      <div className="">
        {/* filters */}

        {/* end of filters */}

        <div className="overflow-x-auto mb-3 mt-3 h-[60vh] overflow-y-auto no-scrollbar  rounded-md py-2">
          {loadingMessags ? (
            <div className="flex items-center justify-center py-4">
              <Loader color="#2667ff" size={24} />
            </div>
          ) : messageData?.data?.message ? (
            <div>
              <p className="my-3 text-center text">
                {messageData?.data?.message}
              </p>
            </div>
          ) : (
            messageData?.data?.chats?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={` mx-2 mb-2 flex justify-between items-center border border-blue-gray-100  bg-gray-50 px-3 py-1 rounded-md cursor-pointer `}
                  onClick={() => {
                    handleChatId(
                      item?._id,
                      getOtherUserProfileImg(item?.participants, auth?.userId),
                      getOtherUserName(item?.participants, auth?.userId),
                      getReceiverId(item?.participants, auth?.userId)
                    );
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        getOtherUserProfileImg(
                          item?.participants,
                          auth?.userId
                        ) || avatar
                      }
                      alt="avatar"
                      className="w-12 h-12 rounded-full "
                    />
                    <div>
                      <p className="font-bold capitalize text-primary">
                        {getOtherUserName(item?.participants, auth?.userId)}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        {item?.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div>
                    {item?.unreadCount > 0 && item?._id !== openedChatId && (
                      <span className="p-1 font-bold rounded-full bg-primary text-light ">
                        {item?.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="my-3">
          <Pagination
            total={totalPages}
            page={activePage}
            color="green"
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Support;
