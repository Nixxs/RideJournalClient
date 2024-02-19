export const initialState = {
    error: null,
}

export const signUpReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return state
        case "SIGNUP_FAILURE":
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}