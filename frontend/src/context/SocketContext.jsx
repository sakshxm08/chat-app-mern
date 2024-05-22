import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext"; // Custom hook to access authentication context
import { io } from "socket.io-client"; // Importing the socket.io client library

// Creating the SocketContext using createContext
export const SocketContext = createContext();

// SocketContextProvider component to provide the socket context to its children
export const SocketContextProvider = ({ children }) => {
  // State to store the socket instance
  const [socket, setSocket] = useState(null);
  // State to store the list of online users
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Accessing authentication context using useAuthContext hook
  const Auth = useAuthContext();

  // Effect hook to establish and manage socket connection
  useEffect(() => {
    // Check if user is authenticated
    if (Auth.user) {
      // Establish socket connection with server using socket.io client
      const socket = io(import.meta.env.VITE_API_BASE_URL, {
        query: { user_id: Auth.user._id }, // Pass user ID as query parameter
      });

      // Set the socket instance in state
      setSocket(socket);

      // Listen for 'get_online_users' event to update online users list
      socket.on("get_online_users", (users) => setOnlineUsers(users));

      // Clean up function to close socket connection on component unmount
      return () => socket.close();
    } else {
      // Close socket connection if user is not authenticated
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth.user]); // Dependency array ensures this effect runs when the user changes

  // Providing the SocketContext.Provider with the socket instance and online users data
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children} {/* Rendering the children components */}
    </SocketContext.Provider>
  );
};

// PropTypes for the SocketContextProvider component
SocketContextProvider.propTypes = {
  children: PropTypes.node, // children prop should be a React node
};
