import { FC } from "react";
import { ArticleWrapper } from "../../../pages/SingleArticle/SingleArticle.styles.tsx";
import { Skeleton, Stack } from "@mui/material";

export const LoadingSingleArticle: FC = () => {
  const tags = [1, 2, 3, 4, 5];

  return (
    <ArticleWrapper>
      <Stack spacing={2}>
        <Skeleton animation="wave" variant="rounded" width="100%" height={40} />

        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Skeleton variant="rounded" width={60} height={20} key={tag} />
          ))}
        </Stack>

        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height={100}
        />
      </Stack>

      <Skeleton animation="wave" variant="rounded" width="100%" height={200} />
    </ArticleWrapper>
  );
};
