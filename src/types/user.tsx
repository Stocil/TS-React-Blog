import { z } from "zod";

export const userResponseSchema = z.object({
  data: z.object({
    user: z.object({
      username: z.string(),
      email: z.string(),
      token: z.string(),
      image: z.string().optional(),
      bio: z.string().optional(),
    }),
  }),
});

export type User = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export type UserAuthRegisterData = {
  username: string;
  email: string;
  password: string;
};
export type UserAuthRegisterQuery = {
  user: UserAuthRegisterData;
};

export type UserAuthLoginData = Omit<UserAuthRegisterData, "username">;
export type UserAuthLoginQuery = {
  user: UserAuthLoginData;
};