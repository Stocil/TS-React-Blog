import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  token: z.string(),
  image: z.string().optional(),
});
export const userWrapperSchema = z.object({
  user: userSchema,
});
export const userResponseSchema = z.object({
  data: userWrapperSchema,
});

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};
export type PartialUser = Partial<User>;

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
