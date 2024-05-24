import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { AuthReducer } from "../reducers/AuthReducer"; // Importing the reducer for authentication
import api from "../api/api"; // Importing the API module for making authentication requests

// Creating the AuthContext using createContext
export const AuthContext = createContext(null);

// AuthContextProvider component to provide the authentication context to its children
export const AuthContextProvider = ({ children }) => {
  // Initializing state using useReducer hook with the AuthReducer
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null, // Current user data
    loading: true, // Loading state to indicate whether authentication data is being loaded
  });

  // Effect hook to load user data on component mount
  useEffect(() => {
    const loginOnPageLoad = async () => {
      try {
        // Fetch user data from the server
        const res = await api.get("/auth/refresh");
        // Dispatching action to update state with user data upon successful login
        dispatch({ type: "LOGIN", payload: res.data });
      } catch (error) {
        console.log(error); // Log any errors that occur during the login process
      } finally {
        // Dispatching action to update loading state to false after login attempt
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    // Calling the loginOnPageLoad function when the component mounts
    loginOnPageLoad();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Providing the AuthContext.Provider with the authentication state and dispatch function
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children} {/* Rendering the children components */}
    </AuthContext.Provider>
  );
};

// PropTypes for the AuthContextProvider component
AuthContextProvider.propTypes = {
  children: PropTypes.node, // children prop should be a React node
};
