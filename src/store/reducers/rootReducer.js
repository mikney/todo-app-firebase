import {combineReducers} from 'redux'
import listReducer from "./todolist";
import authReducer from "./auth";

export default combineReducers({
    list: listReducer,
    auth: authReducer,
})