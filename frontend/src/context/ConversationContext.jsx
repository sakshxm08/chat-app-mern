import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { ConversationReducer } from "../reducers/ConversationReducer";
import api from "../api/api";
import useAuthContext from "../hooks/useAuthContext";

export const ConversationContext = createContext(null);

export const ConversationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ConversationReducer, {
    contacts: [],
    selectedContact: null,
    messages: [],
    messagesByDates: [],
    messagesLoading: true,
    loading: true,
  });

  const Auth = useAuthContext();

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const res = await api.get("/users");
        dispatch({ type: "SET_ALL_CONTACTS", payload: res.data });
        preloadImages(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    if (Auth.user) getAllContacts();
  }, [Auth.user]);
  return (
    <ConversationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ConversationContext.Provider>
  );
};

ConversationContextProvider.propTypes = {
  children: PropTypes.node,
};

const preloadImages = (contacts) => {
  contacts.forEach((contact) => {
    const img = new Image();
    img.src = contact.avatar;
  });
};
