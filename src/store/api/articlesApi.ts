import { api } from "./api.ts";
import { ArticleResponseType } from "../../types/articles.tsx";

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleResponseType, number>({
      query: (offset) => `/articles?limit=5&offset=${offset}`,
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
