import { api } from "./api.ts";
import {
  FollowingUser,
  User,
  UserAuthLoginQuery,
  UserAuthRegisterQuery,
  UserQuery,
  UserUpdateQuery,
} from "../../types/user.tsx";

type getProfileProps = {
  username: string;
  token?: string;
};

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

    followToUser: builder.mutation<FollowingUser, UserQuery>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}/follow`,
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: username,
      }),
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
    }),

    getProfile: builder.query<FollowingUser, getProfileProps>({
      query: ({ username, token }) => ({
        url: `/profiles/${username}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token,
        },
      }),
      providesTags: (_result, _error, arg) => [
        { type: "Author", id: arg.username },
      ],

      keepUnusedDataFor: 0,
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
