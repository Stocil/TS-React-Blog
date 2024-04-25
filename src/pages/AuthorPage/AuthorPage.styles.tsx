import { Avatar, Button, Stack, styled } from "@mui/material";

export const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: 350,
  height: 350,

  [theme.breakpoints.down("sm")]: {
    width: 300,
    height: 300,
  },

  [theme.breakpoints.down("ss")]: {
    width: 250,
    height: 250,
  },
}));

export const AuthorSwitchButton = styled(Button)(({ theme }) => ({
  padding: "10px",
  borderRadius: theme.spacing(1),
  width: 200,
}));

export const AuthorArticlesControl = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),

  [theme.breakpoints.down("ss")]: {
    flexDirection: "column",
  },
}));
