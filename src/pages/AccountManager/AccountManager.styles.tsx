import { Container, Paper, styled } from "@mui/material";

export const FormWrapper = styled(Paper)(({ theme }) => ({
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

export const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  paddingTop: "100px",
  height: "calc(100vh - 96px)",

  [theme.breakpoints.down("sm")]: {
    marginTop: 0,
    height: "100vh",
  },
}));
// { xs: 0, sm: 8 }
// { xs: "100vh", sm: "calc(100vh - 96px)" }
