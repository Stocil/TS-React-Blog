import { userActions } from "./user/userSlice.ts";
import { articlesActions } from "./articles/articlesSlice.ts";
import { themeActions } from "./theme/themeSlice.ts";
import { authorActions } from "./author/authorSlice.ts";

export const rootActions = {
  ...userActions,
  ...articlesActions,
  ...themeActions,
  ...authorActions,
};
