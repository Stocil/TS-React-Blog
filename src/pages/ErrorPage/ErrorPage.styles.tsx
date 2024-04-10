import { Button, styled, Typography } from "@mui/material";

export const FourOFour = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "15rem",
  fontWeight: 700,
}));

export const SingleArticleErrorButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: "1.1rem",
}));
