import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Loader, Pagination } from "@mantine/core";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import avatar from "../../assets/avatar.png";

function Support({ handleChatId }) {
  const axios = useAxiosPrivate();

  const [perPage, setPerPage] = useState(10);
  const [activePage, setPage] = useState(1);
  const [jabberId, setJabberId] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const queryClient = useQueryClient();

  // const { auth } = useAuth();

  const fetchMessages = () => {
    return axios.get(
      `/support?page=${activePage}&perPage=${perPage}&userName=${userName}&jabberId=${jabberId}&role=${role}`
    );
  };

  const {
    isLoading: loadingMessags,
    data: messageData,
    refetch,
    isRefetching: refetchingMessages,
  } = useQuery({
    queryKey: [`messages-`, activePage],
    queryFn: fetchMessages,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    refetchInterval: 5000,
  });

  const totalPages = Math.ceil(messageData?.data?.count / perPage) || 0;

  // pagination refetch
  useEffect(() => {
    refetch();
  }, [activePage, perPage, userName, jabberId, role]);

  return (
    <div className=" px-2 py-3">
      <div className="">
        {/* filters */}
        <div className="  rounded-md ">
          <input
            type="text"
            placeholder="Search by username..."
            className=" py-1 px-2 bg-none outline-none w-full border border-secondary rounded-md   "
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {/* end of filters */}

        <div className="overflow-x-auto mb-3 mt-3 h-[60vh] overflow-y-auto no-scrollbar  rounded-md py-2">
          {loadingMessags ? (
            <div className="flex justify-center py-4  items-center">
              <Loader color="#2667ff" size={24} />
            </div>
          ) : messageData?.data?.message ? (
            <div>
              <p className="text text-center my-3">
                {messageData?.data?.message}
              </p>
            </div>
          ) : (
            messageData?.data?.messages?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={` mx-2 mb-2 flex justify-between items-center border border-blue-gray-100 dark:border-[#322e74] bg-gray-50 dark:bg-[#101835] px-3 py-1 rounded-md cursor-pointer `}
                  onClick={() => {
                    handleChatId(item?.jabberId);
                  }}
                >
                  <div className="flex gap-3 items-center">
                    <img src={avatar} alt="avatar" className="w-12 h-12" />
                    <div>
                      <p className=" capitalize font-bold text-primary  ">
                        {item?.userName}
                      </p>
                      <p className="text text-sm ">{item?.jabberId}</p>
                      <p className="text-sm text-brown-600 ">{item?.role}</p>
                    </div>
                  </div>
                  <div>
                    {item?.adminUnread > 0 && (
                      <span className="font-bold bg-primary text-light rounded-full p-1  ">
                        {item?.adminUnread}
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
