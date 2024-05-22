// Import necessary modules and hooks
import { IoSend } from "react-icons/io5"; // Icon for send button
import useSendMessage from "../hooks/useSendMessage"; // Custom hook for sending messages
import { useState } from "react"; // Hook for managing component state

// MessageInput component definition
const MessageInput = () => {
  // State variable to store message input value
  const [message, setMessage] = useState("");

  // Custom hook to send messages
  const { isLoading, sendMessage } = useSendMessage();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!message) return; // If message is empty, return early
    const success = await sendMessage(message); // Send message
    if (success) setMessage(""); // If message sent successfully, clear input field
  };

  // JSX rendering
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      {/* Message input field */}
      <textarea
        className="w-full p-3 rounded-xl focus:outline-none resize-none dark:bg-dark dark:text-gray-100"
        placeholder="Message"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message state as input value changes
      ></textarea>
      {/* Send button */}
      <button className="flex items-center justify-center w-12 rounded-xl aspect-square bg-primary-500 dark:bg-primary-400 text-white hover:bg-primary-600 dark:hover:bg-primary-500 transition-all cursor-pointer">
        {/* Render send icon or loading spinner based on loading state */}
        {isLoading ? (
          <span className="loading loading-spinner"></span> // Loading spinner
        ) : (
          <IoSend size={16} /> // Send icon
        )}
      </button>
    </form>
  );
};

// Export MessageInput component
export default MessageInput;
