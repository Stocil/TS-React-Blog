import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useTypedSelector } from "../hooks/useTypedSelector.tsx";

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

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

export function Theme({ children }: ThemeProps) {
  const mode: PaletteMode = useTypedSelector((state) => state.theme.theme);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: indigo[200],
      },
      secondary: {
        main: "#eda7f1",
      },
      dark: {
        light: "#2D2D2D",
        main: "#191919",
      },
      background: {
        // default: "#171717",
        // paper: "#171717",
        default: "#1a1d24",
        paper: "#1a1d24",
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
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        variants: [
          {
            props: { variant: "gradient" },
            style: ({ theme }) => ({
              backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 0%, #eda7f1  51%, ${theme.palette.primary.main}  100%)`,
              transition: "0.5s",
              backgroundSize: "200% auto",
              ":hover": {
                backgroundPosition: "right center",
              },
            }),
          },
        ],
        styleOverrides: {
          root: {
            textTransform: "none",
          },
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
