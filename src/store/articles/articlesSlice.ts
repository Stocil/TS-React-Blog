import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesResponseType, ArticleType } from "../../types/articles.tsx";

type ArticlesInitialStateType = {
  articles: ArticleType[];
  articlesCount: number;
};

const initialState: ArticlesInitialStateType = {
  articles: [],
  articlesCount: 0,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticles: (state, action: PayloadAction<ArticlesResponseType>) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
  },
});

export const articlesActions = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
