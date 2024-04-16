import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice.ts";
import { api } from "./api/api.ts";
import { articlesReducer } from "./articles/articlesSlice.ts";
import { themeReducer } from "./theme/themeSlice.ts";

const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
  theme: themeReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
