export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.payload }; // Update user data when user logs in
    }
    case "LOGOUT": {
      return { ...state, user: null }; // Clear user data when user logs out
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload }; // Set loading state
    }
    default: {
      return state; // Return current state for unrecognized actions
    }
  }
};
