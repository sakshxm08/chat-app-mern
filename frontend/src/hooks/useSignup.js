import { useState } from "react"; // Importing useState hook from React
import {
  handleEmptyInputs, // Function to handle empty inputs
  validatePassword, // Function to handle password matching
} from "../utils/handleInputErrors"; // Utility functions for handling input errors
import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import useAuthContext from "./useAuthContext"; // Custom hook to access authentication context

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const Auth = useAuthContext(); // Accessing authentication context using useAuthContext hook

  // Function to handle user signup
  const signup = async (details) => {
    // Validating user input
    if (!handleEmptyInputs(details)) return;
    if (!validatePassword(details.password, details.confPassword)) return;

    setIsLoading(true); // Setting loading state to true

    try {
      // Making a POST request to signup endpoint with user details
      const res = await api.post("/auth/signup", details);

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      // Dispatching action to update authentication context with user data
      Auth.dispatch({ type: "LOGIN", payload: res.data.user });
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Setting loading state back to false
    }
  };

  // Returning signup function and loading state
  return { signup, isLoading };
};

export default useSignup;
