export const initialState = {
    userVehicles: null,
    error: null,
}

export const myVehiclesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_VEHICLES_SUCCESS':
            return {
                ...state,
                userVehicles: action.payload,
            }
        case "GET_USER_VEHICLES_FAILURE":
            return {
                ...state,
                userVehicles: null,
                error: action.payload,
            }
        case "UPDATE_USER_PROFILE_SUCCESS":
            return {
                ...state,
                userVehicles: {
                    ...state.userVehicles,
                    ...action.payload
                }
            }
        case "UPDATE_USER_PROFILE_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        case "ADD_VEHICLE_SUCCESS":
            return {
                ...state,
                userVehicles: {
                    ...state.userVehicles,
                    vehicles: [...state.userVehicles.Vehicles, action.payload]
                }
            }
        case "ADD_VEHICLE_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}