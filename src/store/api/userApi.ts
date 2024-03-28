import { api } from "./api.ts";
import {
  FollowingUser,
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

    followToUser: builder.mutation<FollowingUser, FollowUserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
      invalidatesTags: ["Article"],
    }),

    unfollowFromUser: builder.mutation<FollowingUser, FollowUserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
      invalidatesTags: ["Article"],
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
