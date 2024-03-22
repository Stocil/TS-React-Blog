import { api } from "./api.ts";
import {
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
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = userApi;
