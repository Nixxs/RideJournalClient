export const initialState = {
    signedUp: false,
    user: null,
    error: null,
}

export const signUpReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload,
                signedUp: true,
            }
        case "SIGNUP_FAILURE":
            return {
                ...state,
                likeDetails: null,
                error: action.payload,
            }
        default:
            return state
    }
}