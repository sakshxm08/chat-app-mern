import { useEffect, useRef } from "react";
import useConversationContext from "./useConversationContext";
import { useParams } from "react-router-dom";
import useSocketContext from "./useSocketContext";
import api from "../api/api";

const useMarkMessagesAsRead = (message) => {
  const Conversation = useConversationContext();
  const SocketContext = useSocketContext();

  const { contact_id } = useParams();

  const previousMessageId = useRef(null);

  useEffect(() => {
    const handleNewMessage = async (newMessage) => {
      if (
        contact_id &&
        newMessage.sender_id === contact_id &&
        !newMessage.is_read
      ) {
        // Mark message as read in the frontend
        const contactDetails = Conversation.contacts.find(
          (contact) => contact._id === contact_id
        );
        console.log(!contactDetails?.messages);
        if (!contactDetails?.messages) {
          Conversation.dispatch({
            type: "SET_MESSAGES_LOADING",
            payload: true,
          });
          // If messages not loaded, fetch messages from the backend
          const res = await api.get(`/messages/${contact_id}`);
          Conversation.dispatch({
            type: "SET_MESSAGES_OF_CONTACT",
            payload: { messages: res.data, contact_id },
          });
          Conversation.dispatch({
            type: "SET_MESSAGES_LOADING",
            payload: true,
          });
        }
        Conversation.dispatch({
          type: "MARK_MESSAGE_AS_READ",
          payload: { contact_id, message: newMessage },
        });
        if (SocketContext.socket) {
          // Emit to backend that the message is read
          SocketContext.socket.emit("mark_message_as_read", {
            message_id: newMessage._id,
          });
        }
      }
    };

    if (message?._id && message._id !== previousMessageId.current) {
      previousMessageId.current = message._id;
      handleNewMessage(message);
    }
  }, [
    Conversation,
    contact_id,
    message._id,
    message.sender_id,
    message.is_read,
    message,
    SocketContext.socket,
  ]);
};

export default useMarkMessagesAsRead;
