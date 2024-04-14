import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pagination, Stack } from "@mui/material";

import { useArticleList } from "./hooks/useArticleList.tsx";
import Article from "../Article";
import { ErrorMessage } from "../UIkit/ErrorMessage/ErrorMessage.tsx";

type ArticleListProps = {
  articleOptions?: {
    author?: string;
    favorited?: string;
  };
};

const ArticleList: FC<ArticleListProps> = ({ articleOptions = null }) => {
  const {
    data,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleFollow,
  } = useArticleList(articleOptions);

  if (error) {
    return (
      <ErrorMessage variant="h3" margin="0 auto">
        An error occurred while fetching the articles
      </ErrorMessage>
    );
  }

  return (
    <>
      <Stack spacing={3}>
        {data ? (
          data.articles[0] ? (
            data.articles.map((article) => {
              return (
                <Article
                  isLoading={isFetching}
                  key={uuidv4()}
                  article={article}
                  onArticleFollow={handleFollow}
                />
              );
            })
          ) : (
            <ErrorMessage variant="h3" alignSelf="center">
              No articles were found
            </ErrorMessage>
          )
        ) : null}

        {!isFetching ? (
          <Pagination
            disabled={isFetching}
            count={maxPage}
            page={+currentPage}
            color="secondary"
            size="large"
            onChange={(_, page) => handleChangePage(page)}
            sx={{ alignSelf: "center" }}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default ArticleList;
