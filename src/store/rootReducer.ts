import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice.ts";
import { api } from "./api/api.ts";
import { articlesReducer } from "./articles/articlesSlice.ts";
import { themeReducer } from "./theme/themeSlice.ts";
import { authorReducer } from "./author/authorSlice.ts";

const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
  theme: themeReducer,
  author: authorReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
