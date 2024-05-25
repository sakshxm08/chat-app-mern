import { useState } from "react"; // Importing useState hook from React
import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import useConversationContext from "./useConversationContext"; // Custom hook to access conversation context

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const Conversation = useConversationContext(); // Accessing conversation context using useConversationContext hook

  // Function to send a message
  const sendMessage = async (message) => {
    setIsLoading(true); // Setting loading state to true
    try {
      // Making a POST request to send message to the selected contact
      const res = await api.post(
        `/messages/send/${Conversation.selectedContact._id}`,
        { message }
      );

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      // Dispatching action to update conversation context with the sent message
      Conversation.dispatch({
        type: "SEND_AND_RECEIVE_MESSAGE",
        payload: res.data,
      });

      return true; // Returning true to indicate successful message sending
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
      return false; // Returning false to indicate failed message sending
    } finally {
      // Setting loading state back to false
      setIsLoading(false);
    }
  };

  // Returning loading state and sendMessage function
  return { isLoading, sendMessage };
};

export default useSendMessage;
