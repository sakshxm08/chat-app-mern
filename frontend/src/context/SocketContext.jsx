import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext";
import { io } from "socket.io-client";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const Auth = useAuthContext();

  useEffect(() => {
    if (Auth.user) {
      const socket = io(import.meta.env.VITE_API_BASE_URL, {
        query: { user_id: Auth.user._id },
      });

      setSocket(socket);

      socket.on("get_online_users", (users) => setOnlineUsers(users));

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Auth.user]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node,
};
