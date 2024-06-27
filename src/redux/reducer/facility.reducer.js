import { ADD_Facility, DELETE_FACILITY, EDIT_FACILITY, LOADING_FACILITY } from "../ActionType";

const initialState = {
    isLoading: false,
    facility: [],
    error: null
};

export const FacilitesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_FACILITY:
            return {
                ...state,
                isLoading: action.payload
            };
        case ADD_Facility:
            return {
                ...state,
                isLoading: false,
                facility: [...state.facility, action.payload]
            };
        case DELETE_FACILITY:
            return {
                ...state,
                isLoading: false,
                facility: state.facility.filter((item) => item.id !== action.payload)
            };
        case EDIT_FACILITY:
            return {
                ...state,
                isLoading: false,
                facility: state.facility.map((item) => (item.id === action.payload.id ? action.payload : item))
            };
        default:
            return state;
    }
};
