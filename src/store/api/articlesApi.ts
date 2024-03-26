import { api } from "./api.ts";
import { ArticlesResponseType } from "../../types/articles.tsx";

type getArticlesProps = {
  page: number;
  author?: string;
  favorited?: string;
};

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponseType, getArticlesProps>({
      query: ({ page, author, favorited }) =>
        `/articles?limit=5&offset=${page === 0 ? 0 : (page - 1) * 5}${author ? `&author=${author}` : ""}${favorited ? `&favorited=${favorited}` : ""}`,
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
