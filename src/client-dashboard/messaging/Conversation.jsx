import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { Loader, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { format } from "timeago.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { MdMenu, MdClose } from "react-icons/md";

function Conversation({ jabberId, handleChatId }) {
  const axios = useAxiosPrivate();

  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  // const { jabberId } = useParams();
  const [messageId, setMessageId] = useState("");
  const [sent, setSent] = useState("");
  const scroll = useRef();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //get conversation......................
  function getConversation() {
    return axios.get(`/support/messages/Admin/${jabberId}`);
  }
  // querying funtion
  const {
    data: conversationData,
    isLoading: loadingConversation,
    isError: errorConversation,
  } = useQuery({
    queryKey: [`messages-${jabberId}`],
    queryFn: getConversation,
    refetchInterval: 4000,
    enabled: !!jabberId,
  });

  // end...................

  // upload function
  const uploadMessage = (message) => {
    return axios.post("/support", message);
  };

  const {
    mutate: messageMutate,
    isLoading: messageLoading,
    error,
  } = useMutation({
    mutationFn: uploadMessage,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      queryClient.invalidateQueries([`messages-${jabberId}`]);

      reset();
    },
    onError: (err) => {
      const text = err?.response?.data?.message;
      toast.error(text);

      if (!err.response.data.message) {
        toast.error("something went wrong");
      }
    },
  });

  const submitMessage = (data) => {
    data.jabberId = jabberId;
    data.userName = auth?.userName;
    data.role = auth?.roles[0];
    messageMutate(data);
  };

  // delete message function
  const deleteMessage = (message) => {
    return axios.patch("/support/delete/message", message);
  };

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      queryClient.invalidateQueries([`messages--`]);
      reset();
      close();
    },
    onError: (err) => {
      const text = err?.response?.data?.message;
      toast.error(text);

      if (!err.response.data.message) {
        toast.error("something went wrong");
      }
    },
  });

  const onDelete = () => {
    const data = {};
    data.messageId = messageId;
    data.conversationId = conversationData?.data?._id;
    deleteMutate(data);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [sent, conversationData?.data?.messages?.length]);

  return (
    <div className="theme px-2 py-1">
      <Modal opened={opened} onClose={close} title="Delete message!">
        <h1>Are you sure you want to delete this message?</h1>
        <div>
          {deleteLoading ? (
            <div className="flex justify-center pr-6 items-center">
              <Loader color="#6ba54a" size={10} />
            </div>
          ) : (
            <div className="flex justify-center py-3">
              <button
                className="bg-red-500 text-light py-1 px-4 rounded-md hover:bg-secondary "
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Modal>

      <div className="relative ">
        <div className="">
          <div className="flex  justify-between items-center pr-4 border-b-2 pb-1 border-b-gray-400 dark:border-b-blue-gray-800  ">
            <div>
              <h1 className=" font-bold">{conversationData?.data?.userName}</h1>
              <h1 className=" font- text-sm text-brown-500">
                {conversationData?.data?.jabberId}
              </h1>
            </div>
            <div>
              <span
                className="text"
                onClick={() => {
                  handleChatId("");
                }}
              >
                <MdClose size={27} />
              </span>
            </div>
          </div>

          <div className=" overflow-y-auto overflow-x-auto h-[60vh] pr-3 bg-chatlight dark:bg-chatdark flex flex-col  ">
            {loadingConversation ? (
              <div className="px-2 theme py-3">
                <Skeleton height={10} radius="xl" />
                <Skeleton height={10} mt={6} radius="xl" />
                <Skeleton height={10} mt={6} width="70%" radius="xl" />
              </div>
            ) : (
              conversationData?.data?.messages?.map((message, index) => {
                return (
                  <div
                    className={
                      message.from === "Admin"
                        ? "m-1 bg-[#379237] dark:bg-[#101835] p-1  text-white self-end w-auto  inline-block max-w-[85%]  rounded-br-lg rounded-bl-lg rounded-tl-lg md:round-tr-lg    "
                        : "text-white  bg-gray-800  m-1  p-2  self-start w-auto inline-block max-w-[85%]  rounded-br-lg rounded-bl-lg rounded-tr-lg  md:round-tr-lg "
                    }
                    key={index}
                    ref={scroll}
                  >
                    <div className="p-2 group flex justify-between">
                      <p>
                        {message?.message}
                        <h1 className="text-xs text-left pt-2 text-gray-300">
                          {message?.createdAt ? format(message?.createdAt) : ""}
                        </h1>
                      </p>
                      {message?.from === "Admin" && (
                        <h1
                          className=" hidden peer group-hover:inline-block p-1 cursor-pointer text-[15px] text-right"
                          onClick={() => {
                            setMessageId(message?._id);
                            open();
                          }}
                        >
                          <MdDeleteForever size={20} />
                        </h1>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSubmit(submitMessage)} className="">
            <div className="flex gap-2 mt-2 items-center">
              <input
                type="text"
                className="input"
                placeholder="Type your message..."
                {...register("message", {
                  required: true,
                })}
              />

              <div>
                {messageLoading ? (
                  <div className="flex justify-center pr-6 items-center">
                    <Loader color="#6ba54a" size={25} />
                  </div>
                ) : (
                  <button className="bg-primary text-light py-1 px-4 rounded-md hover:bg-secondary ">
                    Send
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
