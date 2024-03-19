import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserAuthRegisterQuery } from "../../types/user.tsx";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
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
  }),
});

export const { useRegisterUserMutation } = api;
