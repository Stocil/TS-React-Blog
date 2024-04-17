import { styled, Typography } from "@mui/material";

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  textAlign: "center",
  background: `linear-gradient(130deg, ${theme.palette.mode === "dark" ? theme.palette.primary.main : theme.palette.primary.dark} 40%, ${theme.palette.secondary.main} 60%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

export default GradientText;
