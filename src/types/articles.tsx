import { string, z } from "zod";

export const ArticleResponseSchema = z.object({
  articles: z.object({
    slug: z.string(),
    title: string(),
    description: z.string(),
    body: z.string(),
    tags: z.array(z.string()),
    createAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    favorited: z.boolean(),
    favoritesCount: z.number(),

    author: z.object({
      username: z.string(),
      bio: z.string(),
      image: z.string(),
      following: z.boolean(),
    }),
  }),
  articlesCount: z.number(),
});

export type ArticleResponseType = z.infer<typeof ArticleResponseSchema>;
