import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { ConversationReducer } from "../reducers/ConversationReducer"; // Importing the reducer for conversation state management
import api from "../api/api"; // Importing the API module for making requests
import useAuthContext from "../hooks/useAuthContext"; // Custom hook to access authentication context

// Creating the ConversationContext using createContext
export const ConversationContext = createContext(null);

// ConversationContextProvider component to provide the conversation context to its children
export const ConversationContextProvider = ({ children }) => {
  // Initializing state using useReducer hook with the ConversationReducer
  const [state, dispatch] = useReducer(ConversationReducer, {
    contacts: [], // Array to store all contacts
    selectedContact: null, // Currently selected contact
    messages: [], // Array to store messages
    messagesByDates: [], // Array to store messages grouped by dates
    messagesLoading: true, // Loading state to indicate whether messages are being loaded
    loading: true, // Loading state to indicate whether conversation data is being loaded
  });

  // Using the useAuthContext hook to access authentication context
  const Auth = useAuthContext();

  // Effect hook to fetch all contacts and messages on component mount or when user changes
  useEffect(() => {
    // Function to fetch all contacts
    const getAllContacts = async () => {
      try {
        // Fetching all contacts from the server
        const contactsApiResponse = await api.get("/contacts");

        // Dispatching action to update state with all contacts
        dispatch({
          type: "SET_ALL_CONTACTS",
          payload: contactsApiResponse.data,
        });
        // Preloading images to improve performance
      } catch (error) {
        console.log(error); // Log any errors that occur during the fetch process
      } finally {
        // Dispatching action to update loading state to false after fetching contacts
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    // Fetch contacts only if the user is authenticated
    if (Auth.user) {
      getAllContacts(); // Calling the getAllContacts function to fetch contacts
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [Auth.user]); // Dependency array ensures this effect runs when the user changes

  // Providing the ConversationContext.Provider with the conversation state and dispatch function
  return (
    <ConversationContext.Provider value={{ ...state, dispatch }}>
      {children} {/* Rendering the children components */}
    </ConversationContext.Provider>
  );
};

// PropTypes for the ConversationContextProvider component
ConversationContextProvider.propTypes = {
  children: PropTypes.node, // children prop should be a React node
};
