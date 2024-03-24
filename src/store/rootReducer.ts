import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice.ts";
import { api } from "./api/api.ts";
import { articlesReducer } from "./articles/articlesSlice.ts";

const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
