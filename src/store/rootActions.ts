import { userActions } from "./user/userSlice.ts";
import { articlesActions } from "./articles/articlesSlice.ts";

export const rootActions = {
  ...userActions,
  ...articlesActions,
};
