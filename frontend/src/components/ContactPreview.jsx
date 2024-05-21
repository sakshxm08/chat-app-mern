import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const ContactPreview = ({ contact }) => {
  return (
    <Link
      to={`/m/${contact._id}`}
      className="px-6 py-3 hover:bg-base-200 dark:hover:bg-slate-900/40 dark:text-gray-100 transition-all flex gap-4 items-center cursor-pointer"
    >
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={contact.avatar} />
        </div>
      </div>
      <div className="flex flex-col w-ful">
        <div className="flex justify-between items-center">
          <h4 className="font-normal">
            {contact.f_name} {contact.l_name}
          </h4>
          <span className="text-xs ">2:30</span>
        </div>
        <p className="truncate overflow-hidden text-sm text-gray-400 dark:text-gray-500 max-w-56">
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
