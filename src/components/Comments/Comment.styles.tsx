import { Paper, Stack, styled } from "@mui/material";

export const CommentWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

export const InputWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "end",
  gap: theme.spacing(2),
}));

export const SingleCommentWrapper = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flexDirection: "row",
  alignItems: "start",
  gap: theme.spacing(2),
}));

export const SingleCommentUserInfo = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));
