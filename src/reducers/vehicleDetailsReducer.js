export const initialState = {
    vehicleDetails: null,
    error: null,
}

export const vehicleDetailsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_VEHICLE_DETAIL_SUCCESS':
            return {
                ...state,
                vehicleDetails: action.payload
            }
        case "GET_VEHICLE_DETAIL_FAILURE":
            return {
                ...state,
                vehicleDetails: null,
                error: action.payload,
            }
        case "UPDATE_VEHICLE_DETAIL_SUCCESS":
            return {
                ...state,
                vehicleDetails: {
                    ...state.vehicleDetails,
                    ...action.payload
                },
                error: null
            }
        case "UPDATE_VEHICLE_DETAIL_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        case "DELETE_VEHICLE_SUCCESS":
            return {
                ...state,
                vehicleDetails: null,
                error: null
            }
        case "DELETE_VEHICLE_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        case "ADD_EVENT_SUCCESS":
            return {
                ...state,
                vehicleDetails: {
                    ...state.vehicleDetails,
                    Events: [
                        ...state.vehicleDetails.Events,
                        action.payload
                    ]
                },
                error: null
            }
        case "ADD_EVENT_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        case "POST_EVENT_IMAGE_SUCCESS":
            return state
        case "POST_EVENT_IMAGE_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}