import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
const TimeStamp = ({ time, color }) => {
  dayjs.extend(relativeTime);

  const formatDate = (timestamp) => {
    const now = dayjs();
    const messageTime = dayjs(timestamp);
    const diffInDays = now.diff(messageTime, "day");

    if (now.isSame(messageTime, "day")) {
      return messageTime.format("h:mm A"); // Show time if the message is from today
    } else if (diffInDays === 1) {
      return "Yesterday"; // Show "Yesterday" if the message is from yesterday
    } else if (diffInDays < 7) {
      return messageTime.format("dddd"); // Show day if the message is from the past week
    } else {
      return messageTime.format("DD/MM/YY"); // Show date in DD/MM/YY format if earlier than that
    }
  };
  return (
    <span className={`text-[10px] xl:text-xs ${color}`}>
      {formatDate(new Date(time))}
    </span>
  );
};

export default TimeStamp;

TimeStamp.propTypes = {
  time: PropTypes.string,
  color: PropTypes.string,
};
