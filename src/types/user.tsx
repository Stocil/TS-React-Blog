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

export type UserUpdateQuery = {
  user: {
    username: string;
    email: string;
    password?: string;
    image?: string;
  };
  token: string;
};

export type FollowUserQuery = {
  username: string;
  token: string;
};

export type FollowedUser = {
  profile: {
    username: string;
    bio?: string;
    image: string;
    following: boolean;
  };
};

export type AddToFollowerData = {
  username: string;
  image: string;
  following: boolean;
  bio?: string;
};
