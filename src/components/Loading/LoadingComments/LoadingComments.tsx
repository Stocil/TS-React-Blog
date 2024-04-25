import { FC } from "react";
import { Paper, Skeleton, Stack } from "@mui/material";

export const LoadingComments: FC = () => {
  const comments = [1, 2, 3];

  return (
    <Stack spacing={2} mt={4}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
        <Stack direction="row" spacing={1}>
          <Skeleton animation="wave" variant="rounded" height={30} width={40} />

          <Skeleton
            animation="wave"
            variant="rounded"
            height={30}
            width={150}
          />
        </Stack>

        {comments.map((comment) => {
          return (
            <Stack key={comment} direction="row" alignItems="start" spacing={1}>
              <Skeleton variant="circular" sx={{ minWidth: 45 }} height={45} />

              <Stack spacing={1} width={1000}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="rounded" width="90%" height={70} />
              </Stack>
            </Stack>
          );
        })}
      </Paper>
    </Stack>
  );
};
