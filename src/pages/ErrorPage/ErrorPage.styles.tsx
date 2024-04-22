import { Button, styled, Typography } from "@mui/material";

export const FourOFour = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "15rem",
  fontWeight: 700,

  [theme.breakpoints.down("ss")]: {
    fontSize: "9rem",
  },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,

  [theme.breakpoints.down("ss")]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

export const SingleArticleErrorButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: "1.1rem",
}));
