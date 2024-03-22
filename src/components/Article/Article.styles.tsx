import { Avatar, Paper, Stack, styled } from "@mui/material";

export const ArticleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
}));

export const ArticleInfoWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const ArticleUserWrapper = styled(Stack)({
  minWidth: 200,
  alignItems: "end",
});

export const ArticleUserInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const ArticleUserAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});
