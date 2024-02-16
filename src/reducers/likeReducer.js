export const initialState = {
    likeDetails: null,
    totalLikes: 0,
    likedStatus: null,
    error: null,
}

export const likeReducer = (state, action) => {
    switch (action.type) {
        case 'GET_LIKES_SUCCESS':
            return {
                ...state,
                likeDetails: action.payload,
                totalLikes: action.payload.length,
            }
        case "GET_LIKES_FAILURE":
            return {
                ...state,
                likeDetails: null,
                error: action.payload,
            }
        case "SET_LIKE_STATUS":
            return {
                ...state,
                likedStatus: action.payload,
            }
        case "CREATE_LIKE_SUCCESS":
            return {
                ...state,
                likeDetails: state.likeDetails.concat(action.payload),
                totalLikes: state.totalLikes + 1,
                likedStatus: {
                    likeId: action.payload.id,
                    status: true,
                },
            }
        case "CREATE_LIKE_FAILURE":
            return {
                ...state,
                error: action.payload,
            }
        case "DELETE_LIKE_SUCCESS":
            return {
                ...state,
                likeDetails: state.likeDetails.filter(
                    (like) => like.id !== action.payload
                ),
                totalLikes: state.totalLikes - 1,
                likedStatus: null,
            }
        case "DELETE_LIKE_FAILURE":
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}