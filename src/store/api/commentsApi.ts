import { api } from "./api.ts";
import {
  CommentResponseType,
  CommentsResponseType,
} from "../../types/articles.tsx";

type getCommentsType = {
  slug: string;
  token?: string;
};

type createCommentType = Required<getCommentsType> & {
  comment: {
    body: string;
  };
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

      providesTags: ["Comments"],
    }),

    createComments: builder.mutation<CommentResponseType, createCommentType>({
      query: ({ slug, token, comment }) => ({
        url: `/articles/${slug}/comments`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
        body: { comment },
      }),

      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentsMutation } = commentsApi;
