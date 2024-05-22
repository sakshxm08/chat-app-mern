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
          ? "dark:bg-slate-900/60 bg-base-300/60"
          : "hover:bg-base-200/60 dark:hover:bg-slate-900/30") +
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
            <TimeStamp time={contact.latest_message.createdAt} />
          )}
        </div>
        {contact.latest_message && (
          <p className="truncate text-sm text-gray-500 font-light ">
            {contact.latest_message.message}
          </p>
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
