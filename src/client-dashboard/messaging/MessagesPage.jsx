import React, { useState } from "react";
import AllChats from "./AllChats";
import { useQueryClient } from "@tanstack/react-query";
import { MdMenu, MdClose } from "react-icons/md";
import Conversation from "./Conversation";

function MessagesPage1() {
  const [chatId, setChatId] = useState("");
  const [chatMenu, setChatMenu] = useState(false);
  const queryClient = useQueryClient();

  const handleChatId = (value) => {
    setChatId(value);
    setChatMenu(false);
    queryClient.invalidateQueries([`messages-`]);
  };

  return (
    <div>
      <div className="bg-primary/20 pt-[40px] md:pt-[40px] pb-10 px-3 md:px-8 xl:px-[100px]">
        <div className="flex justify-start gap-4 items-center">
          <p className="font-bold text-xl text-gray-600">Messages</p>
        </div>
      </div>
      <div className="mx-auto px-4 md:px-[100px] xl:px-[200px] py-6">
        <div className="flex gap-2">
          <h1 className="font-bold text-lg mb-2 px-2">Your Chats </h1>
          <div className="lg:hidden">
            {chatMenu ? (
              <span
                className="text"
                onClick={() => {
                  setChatMenu(!chatMenu);
                }}
              >
                <MdClose size={27} />
              </span>
            ) : (
              <span
                className="text"
                onClick={() => {
                  setChatMenu(!chatMenu);
                }}
              >
                <MdMenu size={27} />
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 ">
          <div className="hidden lg:inline-block w-[500px] bg-light shadow-sm rounded  ">
            <AllChats handleChatId={handleChatId} />
          </div>

          {/* mobile */}
          <div
            className={`${
              chatMenu
                ? "translate-x-0 fixed lg:hidden z-60 w-[350px] overflow-y-auto no-scrollbar transition-transform duration-300 bg-light shadow-sm rounded"
                : "hidden"
            }`}
          >
            <AllChats handleChatId={handleChatId} />
          </div>

          <div className="w-full bg-light shadow-sm rounded">
            {!chatId ? (
              <p className="text-center text py-2 text-light  bg-secondary  ">
                No chat selected
              </p>
            ) : (
              <Conversation jabberId={chatId} handleChatId={handleChatId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage1;
