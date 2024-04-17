import React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import { useTypedSelector } from "../hooks/useTypedSelector.tsx";

type ThemeProps = {
  children: React.ReactNode;
};

declare module "@mui/material/styles" {
  interface Palette {
    typography: Palette["primary"];
  }

  interface PaletteOptions {
    typography?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

export function Theme({ children }: ThemeProps) {
  const mode: PaletteMode = useTypedSelector((state) => state.theme.theme);

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: indigo[200],
      },
      secondary: {
        main: "#eda7f1",
      },
      typography: {
        main: indigo[200],
      },
      background: {
        // default: "#171717", nice colors
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

  if (mode === "light") {
    theme = createTheme({
      palette: {
        mode,
        primary: {
          light: indigo[50],
          main: indigo[200],
          dark: indigo[300],
        },
        secondary: {
          main: pink[100],
        },
        typography: {
          main: "#000",
        },
        background: {
          default: "#fff",
          paper: indigo[50],
        },
      },

      typography: {
        fontFamily: "'Inter', sans-serif",
      },
      shape: {
        borderRadius: 10,
      },

      components: {
        MuiAppBar: {
          styleOverrides: {
            colorDefault: {
              backgroundColor: indigo[50],
            },
          },
        },
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
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
