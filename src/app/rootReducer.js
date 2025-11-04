import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import creditReducer from "../redux/slices/creditSlice";
import uiReducer from "../redux/slices/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  credits: creditReducer,
  ui: uiReducer,
});

export default rootReducer;
