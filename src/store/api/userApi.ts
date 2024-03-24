import { api } from "./api.ts";
import {
  FollowedUser,
  FollowUserQuery,
  User,
  UserAuthLoginQuery,
  UserAuthRegisterQuery,
  UserUpdateQuery,
} from "../../types/user.tsx";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, UserAuthRegisterQuery>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: userData,
      }),
    }),

    loginUser: builder.mutation<User, UserAuthLoginQuery>({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: userData,
      }),
    }),

    updateUser: builder.mutation<User, UserUpdateQuery>({
      query: ({ user, token }) => ({
        url: "/user",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: { user },
      }),
    }),

    followToUser: builder.mutation<FollowedUser, FollowUserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
    }),

    unfollowFromUser: builder.mutation<FollowedUser, FollowUserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useFollowToUserMutation,
  useUnfollowFromUserMutation,
} = userApi;
