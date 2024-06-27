import { LOADING_FACILITY, ADD_Facility, DELETE_FACILITY, EDIT_FACILITY } from "../ActionType";

export const handleLoading = (data) => (dispatch) => {
    dispatch({ type: LOADING_FACILITY, payload: data });
};

export const Facility_data = (data) => (dispatch) => {
    dispatch(handleLoading(true));
    setTimeout(() => {
        dispatch({ type: ADD_Facility, payload: data });
        dispatch(handleLoading(false));
    }, 2000);
};

export const Delete_data = (data) => (dispatch) => {
    dispatch({ type: DELETE_FACILITY, payload: data });
};

export const Edit_data = (data) => (dispatch) => {
    dispatch({ type: EDIT_FACILITY, payload: data });
};
