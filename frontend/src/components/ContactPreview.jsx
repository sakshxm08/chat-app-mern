import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useSocketContext from "../hooks/useSocketContext";
const ContactPreview = ({ contact }) => {
  const Socket = useSocketContext();

  const isOnline = Socket.onlineUsers.includes(contact._id);

  return (
    <Link
      to={`/m/${contact._id}`}
      className="px-3 xl:px-6 py-3 hover:bg-base-200 dark:hover:bg-slate-900/40 dark:text-gray-100 transition-all flex gap-4 items-center cursor-pointer"
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="md:w-8 lg:w-10 xl:w-12 rounded-full">
          <img src={contact.avatar} />
        </div>
      </div>
      <div className="flex flex-col md:w-[calc(100%-3rem)] lg:w-[calc(100%-3.5rem)] xl:w-[calc(100%-4rem)]">
        <div className="flex justify-between items-center">
          <h4 className="font-normal md:text-sm lg:text-base">
            {contact.f_name} {contact.l_name}
          </h4>
          <span className="text-[10px] xl:text-xs ">2:30</span>
        </div>
        <p className="truncate text-sm text-gray-400 dark:text-gray-500 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          minus earum modi magni natus pariatur, quidem et quaerat alias
          blanditiis.
        </p>
      </div>
    </Link>
  );
};

export default ContactPreview;

ContactPreview.propTypes = {
  contact: PropTypes.object,
};
