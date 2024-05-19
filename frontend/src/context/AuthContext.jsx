import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { AuthReducer } from "../reducers/AuthReducer";
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
