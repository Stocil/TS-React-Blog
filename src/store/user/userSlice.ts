import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.tsx";
import {
  LOCAL_STORAGE_USER_FOLLOWING_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "../../constants";

type UserState = {
  user: User | Record<string, never>;
  following: string[];
};

const initialUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
const initialFollowing = localStorage.getItem(LOCAL_STORAGE_USER_FOLLOWING_KEY);

const initialState: UserState = {
  user: initialUser ? JSON.parse(initialUser) : {},
  following: initialFollowing ? JSON.parse(initialFollowing) : [],
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

    addToFollower: (state, action: PayloadAction<string>) => {
      if (!state.following.includes(action.payload)) {
        state.following.push(action.payload);

        localStorage.setItem(
          LOCAL_STORAGE_USER_FOLLOWING_KEY,
          JSON.stringify(state.following)
        );
      }
    },

    removeFromFollower: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(
        (follower) => follower !== action.payload
      );

      localStorage.setItem(
        LOCAL_STORAGE_USER_FOLLOWING_KEY,
        JSON.stringify(state.following)
      );
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
