import { useContext } from "react";
import { ConversationContext } from "../context/ConversationContext";

const useConversationContext = () => {
  return useContext(ConversationContext);
};

export default useConversationContext;
