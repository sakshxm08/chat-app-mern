import { useRef, useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  // Signup Hook
  const { signup, isLoading } = useSignup();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Form Details State Object
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    username: "",
    password: "",
    conf_password: "",
    gender: "",
  });

  // Password hidden states
  const [passHidden, setPassHidden] = useState(true);
  const [confPassHidden, setConfPassHidden] = useState(true);

  // References of DOM
  const pass_input = useRef();
  const conf_pass_input = useRef();

  // onChange function of inputs
  const setValues = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Submitting the form
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(formData);
  };
  return (
    <div className="flex w-full gap-4">
      <div className="w-1/3 h-full">
        <div className="rounded-xl p-8 flex flex-col gap-4 items-center justify-center w-full bg-base-100 dark:bg-dark h-[40rem] overflow-hidden shadow">
          <h2 className="text-3xl font-bold dark:text-gray-100">
            Already a user?
          </h2>
          <Link to="/login" className="btn w-full">
            Login here
          </Link>
        </div>
      </div>
      <div className="w-2/3 h-full">
        <div className="h-[40rem] bg-white dark:bg-dark rounded-xl p-10 flex items-center justify-center mx-auto flex-col gap-8 dark:text-gray-50">
          <h1 className="text-5xl font-extrabold ">Create an Account</h1>

          <form
            className="w-2/3 grid grid-cols-2 gap-4"
            onSubmit={handleSignup}
          >
            <FloatingLabelInput
              type="text"
              name="f_name"
              id="f_name"
              label="First Name"
              value={formData.f_name}
              onChange={setValues}
            />
            <FloatingLabelInput
              type="text"
              name="l_name"
              id="l_name"
              label="Last Name"
              value={formData.l_name}
              onChange={setValues}
            />
            <FloatingLabelInput
              type="text"
              name="username"
              id="username"
              label="Username"
              className="col-span-2"
              value={formData.username}
              onChange={setValues}
            />
            <FloatingLabelInput
              type="password"
              name="password"
              id="password"
              label="Password"
              className="col-span-2"
              inputRef={pass_input}
              passwordHidden={passHidden}
              setPasswordHidden={setPassHidden}
              value={formData.password}
              onChange={setValues}
            />
            <FloatingLabelInput
              type="password"
              name="conf_password"
              id="conf_password"
              label="Confirm Password"
              className="col-span-2"
              inputRef={conf_pass_input}
              passwordHidden={confPassHidden}
              setPasswordHidden={setConfPassHidden}
              value={formData.conf_password}
              onChange={setValues}
            />
            <div
              className="w-full relative z-20 col-span-2 cursor-pointer"
              onClick={(e) => {
                setDropdownOpen(!dropdownOpen);
                e.stopPropagation();
              }}
            >
              <div className="relative w-full">
                <div className="w-full block h-11 leading-5 capitalize relative pt-4 pb-2 text-gray-800  dark:bg-dark border-b border-gray-300 focus:border-gray-500 dark:border-gray-400 overflow-x-auto dark:text-gray-200 peer text-sm">
                  {formData.gender}
                </div>
                <label
                  className={`absolute text-gray-400 cursor-pointer ${
                    dropdownOpen || formData.gender
                      ? "text-gray-600 dark:text-gray-100 scale-75 -translate-y-5"
                      : "scale-100 translate-y-0"
                  } font-light dark:text-gray-400 duration-300 transform top-4 z-10 origin-[0] text-sm`}
                >
                  Gender
                </label>
                <span className="absolute right-0 top-4">
                  <IoChevronDown color="gray" />
                </span>
              </div>
              <div
                className={`bg-white dark:bg-gray-700 shadow absolute w-full top-full ${
                  dropdownOpen ? "scale-y-100" : "scale-y-0"
                } transition-all origin-top flex flex-col *:p-3 *:text-sm *:transition-all *:cursor-pointer`}
              >
                <label
                  htmlFor="male"
                  className="hover:bg-base-200 dark:hover:bg-gray-600 transition-all"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    className="hidden"
                    value="male"
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                      setDropdownOpen(false);
                    }}
                  />
                  Male
                </label>
                <label
                  htmlFor="female"
                  className="hover:bg-base-200 dark:hover:bg-gray-600 transition-all"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    className="hidden"
                    value="female"
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                      setDropdownOpen(false);
                    }}
                  />
                  Female
                </label>
                <label
                  htmlFor="other"
                  className="hover:bg-base-200 dark:hover:bg-gray-600 transition-all"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    className="hidden"
                    value="other"
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                      setDropdownOpen(false);
                    }}
                  />
                  Other
                </label>
              </div>
            </div>
            <button
              className="bg-primary-500 dark:bg-primary-400 text-white hover:bg-primary-600 dark:hover:bg-primary-500 w-full col-span-2 rounded-lg py-3 text-sm transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
