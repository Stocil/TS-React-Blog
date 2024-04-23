import { FC } from "react";
import { Skeleton, Stack } from "@mui/material";
import { LoadingAuthorAvatar } from "./LoadingAuthorPage.styles.tsx";

export const LoadingAuthorPage: FC = () => {
  return (
    <Stack alignItems="center" spacing={4}>
      <LoadingAuthorAvatar variant="circular" />

      <Skeleton variant="rounded" width={150} height={20} />

      <Skeleton variant="rounded" width={100} height={40} />

      <Stack direction="row" spacing={2}>
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </Stack>
    </Stack>
  );
};
