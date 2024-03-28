import { api } from "./api.ts";
import {
  FollowingUser,
  User,
  UserAuthLoginQuery,
  UserAuthRegisterQuery,
  UserQuery,
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

    //TODO: change Author tag invalidation, add id and e.t.c

    followToUser: builder.mutation<FollowingUser, UserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
      invalidatesTags: ["Article", "Author"],
    }),

    unfollowFromUser: builder.mutation<FollowingUser, UserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
      invalidatesTags: ["Article", "Author"],
    }),

    getProfile: builder.query<FollowingUser, UserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      providesTags: ["Author"],
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
  useGetProfileQuery,
} = userApi;
