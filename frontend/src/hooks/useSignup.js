import { useState } from "react";
import {
  checkPasswordLength,
  handleEmptyInputs,
  handlePasswordsMatch,
} from "../utils/handleInputErrors";
import toast from "react-hot-toast";
import api from "../api/api";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Auth = useAuthContext();
  const signup = async (details) => {
    const success =
      handleEmptyInputs(details) &&
      checkPasswordLength(details.password) &&
      handlePasswordsMatch(details.password, details.conf_password);

    if (!success) return;

    setIsLoading(true);

    try {
      const res = await api.post("/auth/signup", details);

      if (res.data.error) throw new Error(res.data.error);

      Auth.dispatch({ type: "LOGIN", payload: res.data.user });
      console.log(res.data.user);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { signup, isLoading };
};

export default useSignup;
