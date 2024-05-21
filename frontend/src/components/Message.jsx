import PropTypes from "prop-types";
import useAuthContext from "../hooks/useAuthContext";
import dayjs from "dayjs";

const Message = ({ message }) => {
  const Auth = useAuthContext();
  const sent = message.sender_id === Auth.user._id;
  const chatClassName = sent ? "chat-end" : "chat-start";
  const chatBubbleColor = sent
    ? "bg-lime-600 dark:bg-lime-700 text-white"
    : "bg-white dark:bg-dark text-black dark:text-gray-100";
  const timeColor = sent ? "text-gray-200" : "text-gray-400";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className={`chat-bubble ${chatBubbleColor}`}>
        {message.message}
        <div
          className={`flex items-end justify-end text-[10px] w-full ${timeColor}`}
        >
          <time>{dayjs(message.createdAt).format("h:mm A")}</time>
        </div>
      </div>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.object,
};
