import { api } from "./api.ts";
import { CommentsResponseType } from "../../types/articles.tsx";

type getCommentsType = {
  slug: string;
  token?: string;
};

const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentsResponseType, getCommentsType>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/comments`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;
