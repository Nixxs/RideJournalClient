export const initialState = {
  isAuthenticated: false,
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
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, token: null };
    case "UPDATE_USER_PROFILE_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          profile: action.payload.profile,
          image: action.payload.image,
        },
      };
    default:
      return state;
  }
};
