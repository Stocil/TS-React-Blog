import { createSlice } from "@reduxjs/toolkit";
import { PartialUser, User } from "../../types";

type UserAction = {
  type: string;
  payload: User;
};

type UserState = {
  user: PartialUser;
  isLogged: boolean;
};

const initialState: UserState = {
  user: {},
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: UserAction) => {
      state.user = action.payload;
      state.isLogged = true;
    },

    logInUser: (state, action: UserAction) => {
      state.user = action.payload;
      state.isLogged = true;
    },

    updateUser: (state, action: UserAction) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = {};
      state.isLogged = false;
    },
  },
});

export const { registerUser, logInUser, updateUser, logOutUser } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
