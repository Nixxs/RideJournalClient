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
                }
            }
        case "UPDATE_VEHICLE_DETAIL_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}