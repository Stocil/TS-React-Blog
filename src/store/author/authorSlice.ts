import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowingUserData } from "../../types/user.tsx";

type AuthorInitialState = {
  author: FollowingUserData | Record<string, never>;
};

type FollowAuthorOnPagePayload = {
  isFollow: boolean;
};

const initialState: AuthorInitialState = {
  author: {},
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    getAuthor: (state, action: PayloadAction<FollowingUserData>) => {
      state.author = action.payload;
    },

    followOnAuthorPage: (
      state,
      action: PayloadAction<FollowAuthorOnPagePayload>
    ) => {
      state.author.following = !action.payload.isFollow;
    },
  },
});

export const authorActions = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
