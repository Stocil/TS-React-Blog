import { styled, Typography } from "@mui/material";

export const ArticleTag = styled(Typography)(({ theme }) => ({
  borderRadius: 15,
  padding: "4px 8px",
  fontSize: theme.typography.subtitle2.fontSize,
  border: "2px solid",
  borderColor: theme.palette.primary.dark,
}));
