export const initialState = {
    userDetails: null,
    error: null,
}

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                userDetails: action.payload,
            }
        case "GET_USER_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                userDetails: null,
                error: action.payload,
            }
        default:
            return state
    }
}