import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  User,
  UserAuthLoginQuery,
  UserAuthRegisterQuery,
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
