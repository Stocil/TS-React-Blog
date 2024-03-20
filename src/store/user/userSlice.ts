import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.tsx";

type UserState = {
  user: User | Record<string, never>;
};

const initialUser = localStorage.getItem("user");
const initialState: UserState = {
  user: initialUser ? JSON.parse(initialUser) : {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = {};
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
