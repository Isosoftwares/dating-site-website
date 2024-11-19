import React, { useContext, useEffect, useRef, useState } from "react";
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
import avatar from "../../assets/avatar.png";
import { SocketContext } from "../../context/SocketProvider";

function Conversation({
  conversationId,
  handleChatId,
  profileImg,
  recipientName,
  receiverId,
}) {
  const axios = useAxiosPrivate();

  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const socket = useContext(SocketContext);
  const [messageId, setMessageId] = useState("");
  const [sent, setSent] = useState("");
  const scroll = useRef();
  const [sendMessage, setSendMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const textWatch = watch("text");

  //get conversation......................
  function getConversation() {
    return axios.get(
      `/message/conversation/texts/${auth?.userId}/${conversationId}`
    );
  }
  // querying funtion
  const {
    data: conversationData,
    isLoading: loadingConversation,
    isError: errorConversation,
  } = useQuery({
    queryKey: [`messages-${conversationId}`],
    queryFn: getConversation,
    // refetchInterval: 4000,
    enabled: !!conversationId,
  });

  // end...................

  const messageUser = (data) => {
    return axios.post(`/message`, data);
  };

  const { mutate: sendMessageMutate, isPending: messageLoading } = useMutation({
    mutationFn: messageUser,
    onSuccess: (response) => {
      setSendMessage(null);
      conversationData?.data?.messages?.push({
        text: textWatch,
        createdAt: new Date(),
        senderId: auth?.userId,
      });
      reset();
      const text = response?.data?.message;
      toast.success(text);
    },
    onError: (err) => {
      setSendMessage(null);
      const text = err?.response?.data?.message;
      toast.error(text);
    },
  });

  const handleSendMessage = (data) => {
    data.conversationId = conversationId;
    data.senderId = auth?.userId;

    const socketMessageData = {
      text: data.text,
      receiverId,
      conversationId: data?.conversationId,
      createdAt: new Date(),
    };
    setSendMessage(socketMessageData);

    sendMessageMutate(data);
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

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage?.createdAt]);

  // Get the message from socket server
  useEffect(() => {
    socket.on(
      "receive-message",
      (data) => {
        console.log(conversationId, data?.conversationId);

        conversationId === data?.conversationId &&
          conversationData?.data?.messages?.push({
            text: data?.text,
            createdAt: data?.createdAt,
            senderId: "user",
          });

        setSent(new Date());


        // queryClient.invalidateQueries([`unread-${auth?.userId}`]);
      },
      []
    );

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [sent, conversationData?.data?.messages?.length]);

  return (
    <div className="px-2 py-1 ">
      <Modal opened={opened} onClose={close} title="Delete message!">
        <h1>Are you sure you want to delete this message?</h1>
        <div>
          {deleteLoading ? (
            <div className="flex items-center justify-center pr-6">
              <Loader color="#6ba54a" size={10} />
            </div>
          ) : (
            <div className="flex justify-center py-3">
              <button
                className="px-4 py-1 bg-red-500 rounded-md text-light hover:bg-secondary "
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
          <div className="flex items-center justify-between pb-1 pr-4 border-b-2 border-b-gray-400 dark:border-b-blue-gray-800 ">
            <div className="flex items-center gap-3">
              <img
                src={profileImg || avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full "
              />
              <div>
                <p className="font-bold capitalize text-primary">
                  {recipientName}
                </p>
              </div>
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
              <div className="px-2 py-3 theme">
                <Skeleton height={10} radius="xl" />
                <Skeleton height={10} mt={6} radius="xl" />
                <Skeleton height={10} mt={6} width="70%" radius="xl" />
              </div>
            ) : (
              conversationData?.data?.messages?.map((message, index) => {
                return (
                  <div
                    className={
                      message.senderId === auth?.userId
                        ? "m-1 bg-primary p-1  text-white self-end w-auto  inline-block max-w-[85%]  rounded-br-lg rounded-bl-lg rounded-tl-lg md:round-tr-lg    "
                        : "text-white  bg-gray-800  m-1  p-2  self-start w-auto inline-block max-w-[85%]  rounded-br-lg rounded-bl-lg rounded-tr-lg  md:round-tr-lg "
                    }
                    key={index}
                    ref={scroll}
                  >
                    <div className="flex justify-between p-2 group">
                      <p>
                        {message?.text}
                        <h1 className="pt-2 text-xs text-left text-gray-300">
                          {message?.createdAt ? format(message?.createdAt) : ""}
                        </h1>
                      </p>
                      {message?.senderId === auth?.userId && (
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

          <form onSubmit={handleSubmit(handleSendMessage)} className="">
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                className="input"
                placeholder="Type your message..."
                {...register("text", {
                  required: true,
                })}
              />

              <div>
                {messageLoading ? (
                  <div className="flex items-center justify-center pr-6">
                    <Loader color="#6ba54a" size={25} />
                  </div>
                ) : (
                  <button className="px-4 py-1 rounded-md bg-primary text-light hover:bg-secondary ">
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
