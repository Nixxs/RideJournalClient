export const initialState = {
    images: [],
    vehicle: null,
    error: null,
}

export const eventImagesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EVENT_IMAGES_SUCCESS':
            return {
                ...state,
                images: action.payload.map(item => `${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${item.image}`)
            }
        case "GET_EVENT_IMAGES_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                images: [],
                error: action.payload,
            }
        case 'GET_EVENT_VEHICLE_SUCCESS':
            return {
                ...state,
                vehicle: action.payload
            }
        case "GET_EVENT_VEHICLE_FAILURE":
            console.log(action.payload);
            return {
                ...state,
                images: [],
                error: action.payload,
            }
        default:
            return state
    }
}