import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

// Create the Socket Context
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]); // State for active users
  const { auth } = useAuth();
  const userId = auth?.userId;
  const socketLink = "https://socket.lovealto.com";

  useEffect(() => {
    // Establish socket connection
    const newSocket = io(socketLink, {
      transports: ["websocket"], // Ensure WebSocket is used
      reconnection: true,
    });

    setSocket(newSocket);

    // Add the user on connection
    if (userId) {
      newSocket.emit("new-user-add", userId);
      // console.log("User added to active users:", userId);
    }

    // Listen for updates to active users
    newSocket.on("get-users", (users) => {
      setActiveUsers(users?.map((item) => item?.userId)); // Update state with active users
      // console.log("Active users updated:", users);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
