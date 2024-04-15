import { FC } from "react";
import { ArticleWrapper } from "../../Article/Article.styles.tsx";
import { Skeleton, Stack } from "@mui/material";

export const LoadingArticle: FC = () => {
  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={2}>
        <Skeleton animation="wave" variant="rounded" height={40} width={850} />

        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" height={25} width={60} />
          <Skeleton variant="rounded" height={25} width={60} />
          <Skeleton variant="rounded" height={25} width={60} />
        </Stack>

        <Skeleton animation="wave" variant="rounded" height={80} width={800} />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" alignSelf="start">
        <Stack spacing={2}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={14}
            width={120}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={14}
            width={120}
          />
        </Stack>

        <Skeleton variant={"circular"} width={50} height={50} />
      </Stack>
    </ArticleWrapper>
  );
};
