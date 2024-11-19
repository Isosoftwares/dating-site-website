import React, { useState } from "react";
import avatar from "../../assets/holder.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const StartConversationModal = ({ closeModal, user }) => {
  const [message, setMessage] = useState("");
  const axios = useAxiosPrivate();
  const { auth } = useAuth();

  const messageUser = (data) => {
    return axios.post(`/message`, data);
  };

  const { mutate: sendMessageMutate, isPending: loadingSendMessage } =
    useMutation({
      mutationFn: messageUser,
      onSuccess: (response) => {
        const text = response?.data?.message;
        toast.success(text);
        closeModal();
        reset();
      },
      onError: (err) => {
        const text = err?.response?.data?.message;
        toast.error(text);
      },
    });

  const handleSendMessage = () => {
    const data = {
      senderId: auth?.userId,
      receiverId: user?._id,
      text: message,
    };

    sendMessageMutate(data);
  };

  return (
    <div className="flex flex-col ">
      <div className="p-2 bg-white md:p-6 ">
        {/* Header with Profile Picture and Name */}
        <div className="flex items-center mb-4 space-x-4">
          <img
            src={user?.profileImg ? user?.profileImg : avatar}
            alt={`${user?.userName}'s profile`}
            className="w-12 h-12 border border-gray-200 rounded-full"
          />
          <div className="text-lg font-semibold text-gray-800">
            {user?.userName}
          </div>
        </div>

        {/* Text Field */}
        <textarea
          className="w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows="3"
          disabled={loadingSendMessage}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              message.trim()
                ? "bg-primary hover:bg-green-600"
                : "bg-green-300 text-dark cursor-not-allowed"
            } transition`}
            onClick={handleSendMessage}
            disabled={!message.trim() || loadingSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartConversationModal;
