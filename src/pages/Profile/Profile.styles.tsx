import { Avatar, Button, Stack, styled } from "@mui/material";

export const ProfileWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  alignItems: "center",
}));

export const ProfileInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: theme.spacing(5),
  width: "90%",
}));

export const ProfileSwitchButton = styled(Button)(({ theme }) => ({
  padding: "10px",
  borderRadius: theme.spacing(1),
}));

export const ProfileArticleControl = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
}));

export const ProfileDataWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 250,
  height: 250,
  marginTop: "30px",

  [theme.breakpoints.down("sm")]: {
    width: 200,
    height: 200,
  },
}));
