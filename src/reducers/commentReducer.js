export const initialState = {
    comments: [],
    error: null,
}

export const commentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.payload,
            }
        case "GET_COMMENTS_FAILURE":
            return {
                ...state,
                comments: [],
                error: action.payload,
            }
        default:
            return state
    }
}