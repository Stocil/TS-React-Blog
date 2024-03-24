import { api } from "./api.ts";
import { ArticlesResponseType } from "../../types/articles.tsx";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponseType, number>({
      query: (page) =>
        `/articles?limit=5&offset=${page === 0 ? 0 : (page - 1) * 5}`,
    }),

    getFeed: builder.query<ArticlesResponseType, string>({
      query: (token) => ({
        url: `/feed`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetFeedQuery } = articlesApi;
