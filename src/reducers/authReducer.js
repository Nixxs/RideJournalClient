export const initialState = {
  isAuthticated: false,
  user: null,
  token: null,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthticated: false, user: null, token: null };
    default:
      return state;
  }
};
