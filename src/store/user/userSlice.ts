import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.tsx";

type UserState = {
  user: User | Record<string, never>;
  isLogged: boolean;
};

const initialUser = localStorage.getItem("user");
const initialState: UserState = {
  user: initialUser ? JSON.parse(initialUser) : {},
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogged = true;
    },

    logInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLogged = true;
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = {};
      state.isLogged = false;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
