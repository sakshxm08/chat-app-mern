import { useRef, useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { login, isLoading } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const pass_input = useRef();
  const [passHidden, setPassHidden] = useState(true);

  // onChange function of inputs
  const setValues = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Submitting the form
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData);
  };
  return (
    <div className="flex w-full gap-4">
      <div className="w-1/3 h-full">
        <div className="rounded-xl p-8 flex flex-col gap-4 items-center justify-center w-full bg-base-100 dark:bg-dark h-[40rem] overflow-hidden shadow">
          <h2 className="text-3xl font-bold">New here?</h2>
          <Link to="/signup" className="btn w-full">
            Signup here
          </Link>
        </div>
      </div>
      <div className="w-2/3 h-full">
        <div className="h-[40rem] bg-white rounded-xl p-10 flex items-center justify-center mx-auto flex-col gap-8 dark:text-gray-50">
          <h1 className="text-5xl font-extrabold ">Login to Your Account</h1>

          <form className="w-2/3 grid grid-cols-2 gap-4" onSubmit={handleLogin}>
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

            <button
              disabled={isLoading}
              className="bg-lime-600 w-full col-span-2 rounded-lg py-3 text-sm text-white hover:bg-lime-700 transition-all"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
