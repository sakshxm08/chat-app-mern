import { useRef, useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { Link } from "react-router-dom";

const Login = () => {
  const pass_input = useRef();
  const [passHidden, setPassHidden] = useState(true);

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

          <form className="w-2/3 grid grid-cols-2 gap-4">
            <FloatingLabelInput
              type="text"
              name="username"
              id="username"
              label="Username"
              className="col-span-2"
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
            />

            <button className="bg-lime-600 w-full col-span-2 rounded-lg py-3 text-sm text-white hover:bg-lime-700 transition-all">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
