import { useState } from "react"; // Importing useState hook from React
import { handleEmptyInputs } from "../utils/handleInputErrors"; // Function to handle empty input errors
import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import useAuthContext from "./useAuthContext"; // Custom hook to access the auth context

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const Auth = useAuthContext(); // Accessing the auth context using useAuthContext hook

  // Function to handle login process
  const login = async (details) => {
    // Checking for empty inputs
    const success = handleEmptyInputs(details);
    if (!success) return;

    // Setting loading state to true
    setIsLoading(true);
    try {
      // Making a POST request to login endpoint
      const res = await api.post("/auth/login", details);

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      // Dispatching action to update auth context with user data
      Auth.dispatch({ type: "LOGIN", payload: res.data.user });
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
    } finally {
      // Setting loading state back to false
      setIsLoading(false);
    }
  };

  // Returning loading state and login function
  return { isLoading, login };
};

export default useLogin;
