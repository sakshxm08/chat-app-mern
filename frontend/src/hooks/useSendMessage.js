import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";
import useConversationContext from "./useConversationContext";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Conversation = useConversationContext();

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const res = await api.post(
        `/messages/send/${Conversation.selectedContact._id}`,
        { message }
      );

      if (res.data.error) throw new Error(res.data.error);

      Conversation.dispatch({ type: "SEND_MESSAGE", payload: res.data });

      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, sendMessage };
};

export default useSendMessage;
