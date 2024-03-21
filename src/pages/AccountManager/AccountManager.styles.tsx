import { Container, Stack, styled } from "@mui/material";

export const LoggedFormWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(4),
  justifyContent: "center",
  alignItems: "center",
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

export const FormTipWrapper = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
}));
