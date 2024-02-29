export const initialState = {
    events: [],
    error: null,
}

export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENTS_SUCCESS':
            return {
                ...state,
                events: [...state.events, ...action.payload],
                error: null,
            }
        case "GET_EVENTS_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}