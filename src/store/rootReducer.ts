import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice.ts";
import { api } from "./api/api.ts";

const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
