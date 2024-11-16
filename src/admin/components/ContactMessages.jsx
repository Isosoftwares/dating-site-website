import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Loader, Pagination } from "@mantine/core";
import { Link } from "react-router-dom";

function ContactMessages({ closeDrawer }) {
  const axios = useAxiosPrivate();
  const [perPage, setPerPage] = useState(15);
  const [activePage, setPage] = useState(1);

  const fetchMessages = () => {
    return axios.get(`/support?page=${activePage}&perPage=${perPage}`);
  };

  const { isLoading: loadingMessages, data: messagesData, refetch } = useQuery({
    queryKey: [`messages-`],
    queryFn: fetchMessages,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });
  const totalPages = Math.ceil(messagesData?.data?.count / perPage) || 0;
  // pagination refetch
  useEffect(() => {
    refetch();
  }, [activePage, perPage]);
  return (
    <div>
      <div className="border-t dark:border-t-gray-600">
        {loadingMessages ? (
          <div className="flex justify-center py-10 ">
            <Loader color="green" />
          </div>
        ) : messagesData?.data?.message ? (
          <div className="py-10 text-center">
            <p>{messagesData?.data?.message}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-3">
            {messagesData?.data?.messages?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-secondary/5 hover:bg-secondary/20  dark:border-[#030637] dark:bg-[#030637]/10 dark:hover:bg-[#030637]/50 p-6 rounded-md shadow-md border border-secondary "
                >
                  <p>
                    From:{" "}
                    <span className="font-bold capitalize ">{item?.name}</span>
                  </p>
                  <p>Message:</p>
                  <p className="line-clamp-2 mb-2 ">{item?.message}</p>
                  <div>
                    <div className="flex justify-between">
                      <a
                        className="text-primary  "
                        href={`tel:${item?.phoneNo}`}
                      >
                        {item?.phoneNo}
                      </a>
                      <a
                        className="text-primary  "
                        href={`mailto:${item?.email}`}
                      >
                        {item?.email}
                      </a>
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/message/${item?._id}`}
                    state={{ isRead: item?.isRead, message: item }}
                    onClick={closeDrawer}
                  >
                    <button
                      className={`w-full ${
                        item?.isRead ? "bg-gray-600" : "bg-secondary"
                      }  py-1 rounded-md text-lime-50 hover:bg-secondary/60 `}
                    >
                      Open Message
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
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

export default ContactMessages;
