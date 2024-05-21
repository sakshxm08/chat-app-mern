import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { AuthReducer } from "../reducers/AuthReducer";
import api from "../api/api";
export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const loginOnPageLoad = async () => {
      try {
        const res = await api.post("/auth/login");
        dispatch({ type: "LOGIN", payload: res.data });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    loginOnPageLoad();
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
