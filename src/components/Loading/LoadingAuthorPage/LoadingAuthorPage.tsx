import { FC } from "react";
import { Skeleton, Stack } from "@mui/material";

export const LoadingAuthorPage: FC = () => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Skeleton variant="circular" width={350} height={350} />

      <Skeleton variant="rounded" width={150} height={20} />

      <Skeleton variant="rounded" width={100} height={40} />

      <Stack direction="row" spacing={2}>
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </Stack>
    </Stack>
  );
};
