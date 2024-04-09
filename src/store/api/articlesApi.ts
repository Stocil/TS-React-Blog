import { api } from "./api.ts";
import {
  ArticlesResponseType,
  SingleArticleResponseType,
} from "../../types/articles.tsx";

type getArticlesProps = {
  token?: string;
  page: number;
  author?: string;
  favorited?: string;
};

type getSingleArticleProps = {
  token?: string;
  slug: string;
};

type favoriteAnArticleProps = {
  slug: string;
  token: string;
};

type createArticleProps = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
  token: string;
};

type deleteArticleProps = {
  slug: string;
  token: string;
};

type updateArticleProps = createArticleProps & {
  slug: string;
};

const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponseType, getArticlesProps>({
      query: ({ token, page, author, favorited }) => ({
        url: `/articles?limit=5&offset=${page === 0 ? 0 : (page - 1) * 5}${author ? `&author=${author}` : ""}${favorited ? `&favorited=${favorited}` : ""}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map((article) => ({
                type: "Article" as const,
                id: article.author.username,
              })),
              "Article",
            ]
          : ["Article"],
    }),

    getSingleArticle: builder.query<
      SingleArticleResponseType,
      getSingleArticleProps
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),

      providesTags: ["SingleArticle"],
    }),

    favoriteAnArticle: builder.mutation<
      SingleArticleResponseType,
      favoriteAnArticleProps
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      invalidatesTags: ["Article", "SingleArticle"],
    }),

    unfavoriteAnArticle: builder.mutation<
      SingleArticleResponseType,
      favoriteAnArticleProps
    >({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      invalidatesTags: ["Article", "SingleArticle"],
    }),

    createArticle: builder.mutation<
      SingleArticleResponseType,
      createArticleProps
    >({
      query: ({ article, token }) => ({
        url: "/articles",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
        body: { article },
      }),
      invalidatesTags: ["Article"],
    }),

    deleteArticle: builder.mutation<void, deleteArticleProps>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      invalidatesTags: ["Article", "SingleArticle"],
    }),

    updateArticle: builder.mutation<
      SingleArticleResponseType,
      updateArticleProps
    >({
      query: ({ article, slug, token }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
        body: article,
      }),

      invalidatesTags: ["Article", "SingleArticle"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = articlesApi;
