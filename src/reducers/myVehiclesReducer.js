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
            console.log(action.payload);
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
        default:
            return state
    }
}