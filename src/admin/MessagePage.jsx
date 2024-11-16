import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function MessagePage() {
  const location = useLocation();
  const isRead = location.state?.isRead;
  const message = location.state?.message;
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();

  const markAsRead = (data) => {
    return axios.patch(`/support/read/${message?._id}`, data);
  };

  const { mutate: messageMutate, isPending: loadingSend, error } = useMutation({
    mutationFn: markAsRead,

    onSuccess: (response) => {
      queryClient.invalidateQueries([`unread-messages-`]);

      const text = response?.data?.message;
    },

    onError: (err) => {
      const text = err.response.data.message;
    },
  });

  useEffect(() => {
    if (message?.isRead === false) {
      messageMutate();
    }
  }, []);

  return (
    <div>
      <p className="font-bold my-3">Message</p>
      <div className="bg-secondary/5 hover:bg-secondary/20  dark:border-[#030637] dark:bg-[#030637]/10 dark:hover:bg-[#030637]/50 p-6 rounded-md shadow-md border border-secondary ">
        <p>
          From: <span className="font-bold capitalize ">{message?.name}</span>
        </p>
        <p>Message:</p>
        <p className=" mb-2 ">{message?.message}</p>
        <div>
          <div className="flex flex-col">
            <a className="text-primary  " href={`tel:${message?.phoneNo}`}>
              Phone : {message?.phoneNo}
            </a>
            <a className="text-primary  " href={`mailto:${message?.email}`}>
              Email: {message?.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
