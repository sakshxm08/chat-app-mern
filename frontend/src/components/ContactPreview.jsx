// Import necessary modules and components
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import useSocketContext from "../hooks/useSocketContext"; // Custom hook to access socket context
import TimeStamp from "./TimeStamp"; // Component to display timestamp

// ContactPreview component definition
const ContactPreview = ({ contact }) => {
  // Access socket context using custom hook
  const Socket = useSocketContext();

  // Check if contact is online based on their ID
  const isOnline = Socket.onlineUsers.includes(contact._id);

  // JSX rendering
  return (
    <NavLink
      to={`/m/${contact._id}`}
      className={({ isActive }) =>
        (isActive
          ? "dark:bg-gray-900/60 bg-base-300/60"
          : "hover:bg-base-200/60 dark:hover:bg-gray-900/30") +
        " px-3 xl:px-6 py-3 dark:text-gray-100 transition-all flex gap-4 items-center cursor-pointer "
      }
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="md:w-8 lg:w-10 xl:w-12 rounded-full">
          <img src={contact.avatar} />
        </div>
      </div>
      <div className="flex flex-col md:w-[calc(100%-3rem)] lg:w-[calc(100%-3.5rem)] xl:w-[calc(100%-4rem)]">
        <div className="flex justify-between items-center">
          <h4 className="font-medium md:text-sm lg:text-base">
            {contact.f_name} {contact.l_name}
          </h4>
          {contact.latest_message && (
            <TimeStamp
              color={
                contact?.unread_messages?.length > 0
                  ? "text-primary-500 font-medium"
                  : "text-gray-500 dark:text-gray-300"
              }
              time={contact.latest_message.createdAt}
            />
          )}
        </div>
        {contact.latest_message && (
          <div className="w-full flex justify-between items-center">
            <p className="truncate text-sm text-gray-500 font-light ">
              {contact.latest_message.message}
            </p>
            {contact?.unread_messages?.length > 0 && (
              <span className="text-[10px] text-white bg-primary-500 p-px w-4 font-bold aspect-square rounded-full flex items-center justify-center">
                {contact?.unread_messages?.length}
              </span>
            )}
          </div>
        )}
      </div>
    </NavLink>
  );
};

// Define prop types for ContactPreview component
ContactPreview.propTypes = {
  contact: PropTypes.object, // Contact prop should be an object
};

// Export ContactPreview component
export default ContactPreview;
