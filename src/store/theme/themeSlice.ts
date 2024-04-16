import { LOCAL_STORAGE_THEME_KEY } from "../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || "dark";
const initialState = {
  theme: initialTheme as "dark" | "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.theme = action.payload;

      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
