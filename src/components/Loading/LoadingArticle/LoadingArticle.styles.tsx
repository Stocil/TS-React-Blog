import { Skeleton, Stack, styled } from "@mui/material";

export const LoadingArticleAuthorData = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  alignItems: "center",
  alignSelf: "start",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "end",
  },
}));

export const LoadingTag = styled(Skeleton)(({ theme }) => ({
  height: 25,
  width: 60,

  [theme.breakpoints.down("sm")]: {
    width: 40,
    height: 15,
  },
}));
