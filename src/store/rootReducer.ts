import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice.ts";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
