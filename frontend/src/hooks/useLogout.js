import { useState } from "react";
import api from "../api/api";
import useAuthContext from "./useAuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Auth = useAuthContext();

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      if (res.data.error) throw new Error(res.data.error);
      Auth.dispatch({ type: "LOGOUT" });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};

export default useLogout;
