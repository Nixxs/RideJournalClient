export const initialState = {
    vehicles: [],
    error: null,
}

export const vehicleReducer = (state, action) => {
    switch (action.type) {
        case 'GET_VEHICLES_SUCCESS':
            return {
                ...state,
                vehicles: action.payload,
            }
        case "GET_VEHICLES_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                vehicles: [],
                error: action.payload,
            }
        default:
            return state
    }
}