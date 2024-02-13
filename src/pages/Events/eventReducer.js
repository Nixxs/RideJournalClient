export const initialState = {
    events: [],
    error: null,
}

export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENTS_SUCCESS':
            return {
                ...state,
                events: action.payload,
            }
        case "GET_EVENTS_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                events: [],
                error: action.payload,
            }
        default:
            return state
    }
}