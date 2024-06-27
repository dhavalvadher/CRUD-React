import { combineReducers } from "redux";
import { FacilitesReducer } from "./facility.reducer";

export const rootReducer = combineReducers({
    facilites: FacilitesReducer
});


