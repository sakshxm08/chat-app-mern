import useSocketContext from "./useSocketContext";
import useConversationContext from "./useConversationContext";
import { useEffect } from "react";

const useListenMessages = () => {
  const Socket = useSocketContext();
  const Conversation = useConversationContext();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      Conversation.dispatch({
        type: "SEND_AND_RECEIVE_MESSAGE",
        payload: newMessage,
      });
    };

    if (Socket.socket) {
      Socket.socket.on("new_message", handleNewMessage);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (Socket.socket) {
        Socket.socket.off("new_message", handleNewMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Socket.socket, Conversation.dispatch]);
};

export default useListenMessages;
