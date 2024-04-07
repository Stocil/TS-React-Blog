import { Button, Paper, Stack, styled, Typography } from "@mui/material";

export const FourOFour = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "15rem",
}));

export const SingleArticleErrorButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  fontSize: "1.1rem",
}));

export const ArticleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),

  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const ArticleTagsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const SingleArticleDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  opacity: 0.6,
}));
