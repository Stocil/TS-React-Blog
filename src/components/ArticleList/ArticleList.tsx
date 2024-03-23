import { FC } from "react";
import Article from "../Article";
import { Stack, Typography } from "@mui/material";
import { useArticleList } from "./hooks/useArticleList.tsx";

const ArticleList: FC = () => {
  const { currentOffset, isLoading } = useArticleList();

  if (isLoading) {
    <Typography>Loading...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Article />
      <Article />
      <Article />
    </Stack>
  );
};

export default ArticleList;
