import { Paper, styled } from "@mui/material";

const FormWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  width: "40%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3, 2),
  // background: "linear-gradient(130deg, #212121 5% , #243d57 65%, #212121 95%)",
  // background: "linear-gradient(130deg, #212121 5% , #291f37 65%, #212121 95%)",
  background: `linear-gradient(130deg, ${theme.palette.background.default} 5% , #1a2239 65%, ${theme.palette.background.default} 95%)`,
}));

export default FormWrapper;
