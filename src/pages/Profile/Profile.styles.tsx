import { Stack, styled } from "@mui/material";

export const ProfileWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
}));

export const ProfileInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(5),
}));

export const FollowingWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(2),
  maxWidth: 700,
  rowGap: theme.spacing(3),
}));
