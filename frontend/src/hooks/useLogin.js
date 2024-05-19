import { useState } from "react";
import { handleEmptyInputs } from "../utils/handleInputErrors";
import toast from "react-hot-toast";
import api from "../api/api";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const Auth = useAuthContext();
  const login = async (details) => {
    const success = handleEmptyInputs(details);
    if (!success) return;

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", details);

      if (res.data.error) throw new Error(res.data.error);

      Auth.dispatch({ type: "LOGIN", payload: res.data.user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, login };
};

export default useLogin;
