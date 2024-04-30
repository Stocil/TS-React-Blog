import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesResponseType, ArticleType } from "../../types/articles.tsx";

type ArticlesInitialStateType = {
  articles: ArticleType[];
  singleArticle: ArticleType | Record<string, never>;
  articlesCount: number;
};

type FavouriteAnArticlePayload = {
  slug: string;
  follow: boolean;
};

type FavoriteUserPayload = {
  username: string;
  isFollow: boolean;
};

const initialState: ArticlesInitialStateType = {
  articles: [],
  singleArticle: {},
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

    getSingleArticle: (state, action: PayloadAction<ArticleType>) => {
      state.singleArticle = action.payload;
    },

    toggleArticleFavorite: (
      state,
      action: PayloadAction<FavouriteAnArticlePayload>
    ) => {
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          article.favorited = action.payload.follow;
          article.favoritesCount = action.payload.follow
            ? article.favoritesCount + 1
            : article.favoritesCount - 1;
        }

        return article;
      });

      if (state.singleArticle.slug) {
        state.singleArticle.favorited = action.payload.follow;
        state.singleArticle.favoritesCount = action.payload.follow
          ? state.singleArticle.favoritesCount + 1
          : state.singleArticle.favoritesCount - 1;
      }
    },

    toggleArticleUserFollow: (
      state,
      action: PayloadAction<FavoriteUserPayload>
    ) => {
      state.articles = state.articles.map((article) => {
        if (article.author.username === action.payload.username) {
          article.author.following = !action.payload.isFollow;
        }

        return article;
      });
    },
  },
});

export const articlesActions = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
