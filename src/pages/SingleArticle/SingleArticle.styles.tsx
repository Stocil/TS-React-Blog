import { Button, Paper, Stack, styled, Typography } from "@mui/material";

export const SingleArticleDeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,

  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}));

export const ArticleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),

  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const ArticleInfoWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "start",
  gap: theme.spacing(2),

  [theme.breakpoints.down("ss")]: {
    flexDirection: "column",
  },
}));

export const ArticleTagsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  flexWrap: "wrap",
}));

export const SingleArticleDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  opacity: 0.6,
  wordBreak: "break-all",
}));
