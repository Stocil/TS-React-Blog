import { FC } from "react";
import { ArticleWrapper } from "../../Article/Article.styles.tsx";
import { Skeleton, Stack } from "@mui/material";
import {
  LoadingArticleAuthorData,
  LoadingTag,
} from "./LoadingArticle.styles.tsx";

export const LoadingArticle: FC = () => {
  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={2} width={850}>
        <Skeleton animation="wave" variant="rounded" height={40} width="95%" />

        <Stack direction="row" spacing={1}>
          <LoadingTag variant="rounded" />
          <LoadingTag variant="rounded" />
          <LoadingTag variant="rounded" />
        </Stack>

        <Skeleton animation="wave" variant="rounded" height={80} width="85%" />
      </Stack>

      <LoadingArticleAuthorData>
        <Stack spacing={2} width={{ xs: 80, sm: 120 }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={14}
            width="100%"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={14}
            width="100%"
          />
        </Stack>

        <Skeleton variant={"circular"} width={50} height={50} />
      </LoadingArticleAuthorData>
    </ArticleWrapper>
  );
};
