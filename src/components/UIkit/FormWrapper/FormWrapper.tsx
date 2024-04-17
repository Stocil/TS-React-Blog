import { Paper, styled } from "@mui/material";

const FormWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  width: "40%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3, 2),
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(130deg, ${theme.palette.background.default} 5% ,#1a2239 65%, ${theme.palette.background.default} 95%)`
      : theme.palette.primary.light,
}));

export default FormWrapper;
