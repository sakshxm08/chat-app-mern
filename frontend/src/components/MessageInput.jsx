import { IoSend } from "react-icons/io5";
import useSendMessage from "../hooks/useSendMessage";
import { useState } from "react";
const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { isLoading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const success = await sendMessage(message);
    if (success) setMessage("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <textarea
        className="w-full p-3 rounded-xl focus:outline-none resize-none dark:bg-dark dark:text-gray-100"
        placeholder="Message"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="flex items-center justify-center w-12 rounded-xl bg-lime-600 dark:bg-lime-700 aspect-square text-white hover:bg-lime-700 dark:hover:bg-lime-800 transition-all cursor-pointer">
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <IoSend size={16} />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
