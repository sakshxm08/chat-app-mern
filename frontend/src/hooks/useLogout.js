import { useState } from "react"; // Importing useState hook from React
import api from "../api/api"; // Importing API functions for making requests
import useAuthContext from "./useAuthContext"; // Custom hook to access the auth context
import toast from "react-hot-toast"; // Library for displaying toast messages

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const Auth = useAuthContext(); // Accessing the auth context using useAuthContext hook

  // Function to handle logout
  const logout = async () => {
    try {
      // Making a POST request to logout endpoint
      const res = await api.post("/auth/logout");

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      localStorage.removeItem("session");

      // Dispatching action to update auth context with logout status
      Auth.dispatch({ type: "LOGOUT" });
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
    } finally {
      // Setting loading state back to false
      setIsLoading(false);
    }
  };

  // Returning logout function and loading state
  return { logout, isLoading };
};

export default useLogout;
