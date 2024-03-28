import { string, z } from "zod";

export const ArticleSchema = z.object({
  slug: z.string(),
  title: string(),
  description: z.string(),
  body: z.string().optional(),
  tagList: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
  author: z.object({
    username: z.string(),
    bio: z.string().optional(),
    image: z.string(),
    following: z.boolean(),
  }),
});

export type ArticleType = z.infer<typeof ArticleSchema>;

export const ArticlesResponseSchema = z.object({
  articles: z.array(ArticleSchema),
  articlesCount: z.number(),
});

export type ArticlesResponseType = z.infer<typeof ArticlesResponseSchema>;

export type SingleArticleResponseType = Omit<
  ArticlesResponseType,
  "articlesCount"
>;
