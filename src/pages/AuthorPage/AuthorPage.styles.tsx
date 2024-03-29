import { Avatar, Button, Stack, styled } from "@mui/material";

export const AuthorAvatar = styled(Avatar)({
  width: 350,
  height: 350,
});

export const AuthorSwitchButton = styled(Button)(({ theme }) => ({
  padding: "10px",
  borderRadius: theme.spacing(1),
}));

export const AuthorArticlesControl = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));
