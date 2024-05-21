export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }
    default: {
      return state;
    }
  }
};
