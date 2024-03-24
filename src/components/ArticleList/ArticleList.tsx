import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pagination, Stack, Typography } from "@mui/material";

import { useArticleList } from "./hooks/useArticleList.tsx";
import Article from "../Article";
import { ErrorMessage } from "../UIkit/ErrorMessage/ErrorMessage.tsx";

const ArticleList: FC = () => {
  const {
    data,
    followed,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleFollowToUser,
  } = useArticleList();

  if (isFetching) {
    return <Typography>Loading...</Typography>;
  }

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
                  key={uuidv4()}
                  article={article}
                  isFollow={followed.includes(article.author.username)}
                  onFollow={handleFollowToUser}
                />
              );
            })
          ) : (
            <ErrorMessage variant="h3" alignSelf="center">
              No articles were found
            </ErrorMessage>
          )
        ) : null}

        <Pagination
          disabled={isFetching}
          count={maxPage}
          page={+currentPage}
          color="secondary"
          size="large"
          onChange={(_, page) => handleChangePage(page)}
          sx={{ alignSelf: "center" }}
        />
      </Stack>
    </>
  );
};

export default ArticleList;
