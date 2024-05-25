// Import necessary modules and hooks
import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext"; // Custom hook to access authentication context
import dayjs from "dayjs"; // Library for date and time formatting
import useMarkMessagesAsRead from "../hooks/useMarkMessagesAsRead";
// Message component definition
const Message = ({ message }) => {
  // Access authentication context using custom hook
  const Auth = useAuthContext();

  // Determine if message was sent by the authenticated user
  const sent = message.sender_id === Auth.user._id;

  // Determine chat bubble class name based on message sender
  const chatClassName = sent ? "chat-end" : "chat-start";

  // Determine chat bubble color based on message sender
  const chatBubbleColor = sent
    ? "bg-primary-500 dark:bg-primary-400 text-white"
    : "bg-white dark:bg-dark text-black dark:text-gray-100";

  // Determine time color based on message sender
  const timeColor = sent ? "text-gray-200" : "text-gray-400";

  // Mark Message As Read
  useMarkMessagesAsRead(message);

  // JSX rendering
  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble ${chatBubbleColor}`}>
        {message.message} {/* Render message text */}
        <div
          className={`flex items-end justify-end text-[10px] w-full ${timeColor}`}
        >
          {/* Render message time */}
          <time>{dayjs(message.createdAt).format("h:mm A")}</time>
        </div>
      </div>
    </div>
  );
};

// Define prop types for Message component
Message.propTypes = {
  message: PropTypes.object, // Message object
};

// Export Message component
export default Message;
