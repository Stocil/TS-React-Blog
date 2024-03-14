import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { indigo } from "@mui/material/colors";

type ThemeProps = {
  children: React.ReactNode;
};

declare module "@mui/material/styles" {
  interface Palette {
    dark: Palette["primary"];
  }

  interface PaletteOptions {
    dark?: PaletteOptions["primary"];
  }
}

// TODO: add light theme
const mode: PaletteMode = "dark";

export function Theme({ children }: ThemeProps) {
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: indigo[200],
      },
      secondary: {
        main: indigo[300],
      },
      dark: {
        light: "#2D2D2D",
        main: "#191919",
      },
      background: {
        default: "#212121",
        paper: "#212121",
      },
    },

    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    shape: {
      borderRadius: 10,
    },

    components: {
      MuiContainer: {
        defaultProps: {
          component: "section",
          maxWidth: "lg",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
