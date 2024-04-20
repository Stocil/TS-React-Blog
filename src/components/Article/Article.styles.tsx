import { Avatar, Paper, Stack, styled, Typography } from "@mui/material";

export const ArticleWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(2),
}));

export const ArticleInfoWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",

  [theme.breakpoints.down("ss")]: {
    gap: 0,
  },
}));

export const ArticleTagsWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));

export const ArticleUserWrapper = styled(Stack)(({ theme }) => ({
  minWidth: 250,
  alignItems: "end",

  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
  },
}));

export const ArticleUserAvatar = styled(Avatar)({
  width: 45,
  height: 45,
});

export const ArticleTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.typography.main,
  wordBreak: "break-all",
  fontSize: theme.typography.h5.fontSize,

  [theme.breakpoints.down("ss")]: {
    fontSize: theme.typography.h6.fontSize,
  },
}));

export const ArticleDescription = styled(Typography)(({ theme }) => ({
  maxWidth: "calc(100% - 45px)",
  minWidth: 200,
  wordBreak: "break-all",

  [theme.breakpoints.down("ss")]: {
    minWidth: "auto",
  },
}));
