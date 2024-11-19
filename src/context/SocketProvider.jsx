import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

// Create the Socket Context
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { auth } = useAuth();
  const userId = auth?.userId;

  useEffect(() => {
    // Establish socket connection
    const newSocket = io("http://localhost:8800", {
      transports: ["websocket"], // Ensure WebSocket is used
      reconnection: true,
    });

    setSocket(newSocket);

    // Add the user on connection
    if (userId) {
      newSocket.emit("new-user-add", userId);
      console.log("User added to active users:", userId);
    }

    // Listen for events if needed (e.g., active users update)
    newSocket.on("get-users", (activeUsers) => {
      console.log("Active users:", activeUsers);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
