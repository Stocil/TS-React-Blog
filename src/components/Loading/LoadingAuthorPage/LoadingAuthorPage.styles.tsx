import { Skeleton, styled } from "@mui/material";

export const LoadingAuthorAvatar = styled(Skeleton)(({ theme }) => ({
  width: 350,
  height: 350,

  [theme.breakpoints.down("ss")]: {
    width: 250,
    height: 250,
  },
}));
