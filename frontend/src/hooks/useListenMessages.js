import useSocketContext from "./useSocketContext"; // Custom hook to access the socket context
import useConversationContext from "./useConversationContext"; // Custom hook to access the conversation context
import { useEffect } from "react"; // Importing the useEffect hook from React

const useListenMessages = () => {
  // Accessing the socket context using useSocketContext hook
  const SocketContext = useSocketContext();
  // Accessing the conversation context using useConversationContext hook
  const Conversation = useConversationContext();

  useEffect(() => {
    // Function to handle new incoming messages
    const handleNewMessage = (newMessage) => {
      // Dispatching an action to update the conversation context with the new message
      Conversation.dispatch({
        type: "SEND_AND_RECEIVE_MESSAGE",
        payload: newMessage,
      });
      Conversation.dispatch({
        type: "UPDATE_UNREAD_MESSAGES",
        payload: newMessage,
      });
    };

    // Checking if the socket is available
    if (SocketContext.socket) {
      // Listening for 'new_message' event from the socket
      SocketContext.socket.on("new_message", handleNewMessage);
    }

    // Cleanup function to remove the event listener when component unmounts or socket changes
    return () => {
      if (SocketContext.socket) {
        SocketContext.socket.off("new_message", handleNewMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketContext.socket, Conversation.dispatch]); // Dependency array ensures the effect runs when socket or conversation dispatch function changes
};

export default useListenMessages;
