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
  const { socket } = useContext(SocketContext);
  const [messageId, setMessageId] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const { register, handleSubmit, reset } = useForm();

  // Fetch conversation
  const { data: conversationData, isLoading: loadingConversation } = useQuery({
    queryKey: [`messages-${conversationId}`],
    queryFn: () =>
      axios.get(
        `/message/conversation/texts/${auth?.userId}/${conversationId}`
      ),
    enabled: !!conversationId,
    onSuccess: (data) => {
      setMessages(data?.data?.messages || []);
    },
  });

  useEffect(() => {
    if (conversationData?.data?.messages) {
      // console.log("Fetched data:", conversationData.data.messages); // Debugging
      setMessages(conversationData.data.messages);
    }
  }, [conversationData]);

  // console.log(conversationData?.data?.messages);

  // Mutation to send a message
  const { mutate: sendMessageMutate, isLoading: messageLoading } = useMutation({
    mutationFn: (data) => axios.post(`/message`, data),
    onSuccess: (response, variables) => {
      const newMessage = {
        text: variables.text,
        createdAt: new Date(),
        senderId: auth?.userId,
      };
      setMessages((prev) => [...prev, newMessage]);
      reset();
      toast.success(response?.data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSendMessage = (data) => {
    const messageData = {
      ...data,
      conversationId,
      senderId: auth?.userId,
    };
    const socketMessageData = {
      text: data.text,
      receiverId,
      conversationId,
      createdAt: new Date(),
    };

    socket.emit("send-message", socketMessageData);
    sendMessageMutate(messageData);
  };

  // Handle message deletion
  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (data) => axios.patch("/support/delete/message", data),
    onSuccess: () => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      toast.success("Message deleted");
      close();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const onDelete = () => {
    deleteMutate({
      messageId,
      conversationId,
    });
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleMessage = (data) => {
      if (data?.conversationId === conversationId) {
        setMessages((prev) => [...prev, data]);
      }
      queryClient.invalidateQueries([`chats-${auth?.userId}`]);
      queryClient.invalidateQueries([`messages-${conversationId}`]);
    };

    socket.on("receive-message", handleMessage);
    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [socket, conversationId]);

  // Scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-2 py-1">
      <Modal opened={opened} onClose={close} title="Delete message!">
        <h1>Are you sure you want to delete this message?</h1>
        <div>
          {deleteLoading ? (
            <Loader color="#6ba54a" size={10} />
          ) : (
            <div className="flex justify-center py-3">
              <button
                className="px-4 py-1 bg-red-500 rounded-md text-light hover:bg-secondary"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Modal>

      <div className="relative">
        <div className="flex items-center justify-between pb-1 pr-4 border-b-2">
          <div className="flex items-center gap-3">
            <img
              src={profileImg || avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <p className="font-bold capitalize text-primary">{recipientName}</p>
          </div>
          <MdClose size={27} onClick={() => handleChatId("")} />
        </div>

        <div className="overflow-y-auto h-[60vh] bg-chatlight dark:bg-chatdark flex flex-col">
          {loadingConversation ? (
            <Skeleton height={10} radius="xl" count={5} />
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.senderId === auth?.userId
                    ? "self-end bg-primary text-white"
                    : "self-start bg-gray-800 text-white"
                } m-1 p-2 max-w-[85%] rounded-lg`}
                ref={scroll}
              >
                <p>{message.text}</p>
                <p className="text-xs text-gray-300">
                  {format(message.createdAt)}
                </p>
                {/* {message.senderId === auth?.userId && (
                  <MdDeleteForever
                    size={20}
                    onClick={() => {
                      setMessageId(message._id);
                      open();
                    }}
                  />
                )} */}
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit(handleSendMessage)} className="flex mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            {...register("text", { required: true })}
            className="flex-grow input"
          />
          <button
            type="submit"
            disabled={messageLoading}
            className="px-4 py-1 rounded-md bg-primary text-light hover:bg-secondary"
          >
            {messageLoading ? <Loader size={20} /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Conversation;
