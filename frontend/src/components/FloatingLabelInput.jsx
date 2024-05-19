import PropTypes from "prop-types";
import { IoEyeOffOutline, IoEye } from "react-icons/io5";

const FloatingLabelInput = ({
  label,
  name,
  type = "text",
  id,
  className = "",
  inputRef = null,
  setPasswordHidden,
  passwordHidden,
  value,
  onChange,
}) => {
  // Toggle Password Visibility
  const togglePass = () => {
    setPasswordHidden(!passwordHidden);
    if (passwordHidden) inputRef.current.type = "text";
    else inputRef.current.type = "password";
  };
  return (
    <div className={"relative z-0 w-full " + className}>
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full block leading-5 relative pt-4 pb-2 text-gray-800  dark:bg-gray-700 border-b border-gray-300 focus:border-gray-500 dark:border-gray-400 overflow-x-auto focus:outline-none focus:border-primary-600 focus:ring-0 dark:text-gray-200 dark:focus:border-primary-200 peer text-sm"
        placeholder=" "
        required
      />
      <label
        htmlFor={id}
        className="absolute text-gray-400 peer-focus:text-gray-600 font-light peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-4 z-10 origin-[0] peer-focus:text-primary-600 dark:peer-focus:text-primary-200 peer-focus:scale-75 peer-valid:scale-75 peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-invalid:text-error-600 dark:peer-invalid:text-error-200 text-sm"
      >
        {label}
      </label>
      {type === "password" && (
        <span
          className="absolute right-2 top-[12px] cursor-pointer hover:bg-white hover:text-black rounded-full p-1 transition-all"
          onClick={togglePass}
        >
          {passwordHidden ? <IoEyeOffOutline size={16} /> : <IoEye size={16} />}
        </span>
      )}
    </div>
  );
};

export default FloatingLabelInput;

FloatingLabelInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  inputRef: PropTypes.object,
  setPasswordHidden: PropTypes.func,
  passwordHidden: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
