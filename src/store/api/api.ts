import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  UserAuthLoginQuery,
  UserAuthRegisterQuery,
  UserUpdateQuery,
} from "../../types/user.tsx";
import { BASE_URL } from "../../constants";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = api;
