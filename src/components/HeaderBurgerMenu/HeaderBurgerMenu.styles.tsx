import { Stack, styled } from "@mui/material";

export const HeaderBurgerWrapper = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2, 4),
  gap: theme.spacing(4),

  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",

  [theme.breakpoints.down("sm")]: {
    width: "100vw",
  },
}));

export const HeaderBurgerInner = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  justifyContent: "center",
}));
