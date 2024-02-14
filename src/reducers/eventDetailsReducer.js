export const initialState = {
    eventDetails: null,
    error: null,
}

export const eventDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENT_DETAIL_SUCCESS':
            return {
                ...state,
                eventDetails: action.payload
            }
        case "GET_EVENT_DETAIL_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                eventDetails: null,
                error: action.payload,
            }
        default:
            return state
    }
}