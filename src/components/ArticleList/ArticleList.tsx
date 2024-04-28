import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pagination, Stack } from "@mui/material";

import { useArticleList } from "./hooks/useArticleList.tsx";
import Article from "../Article";
import { ErrorMessage } from "../UIkit/ErrorMessage/ErrorMessage.tsx";
import { LoadingArticle } from "../Loading";
import { usePagination } from "./hooks/usePagination.tsx";
import { AlertSnackbar } from "../UIkit/Snackbar/AlertSnackbar.tsx";

type ArticleListProps = {
  articleOptions?: {
    author?: string;
    favorited?: string;
  };
};

const ArticleList: FC<ArticleListProps> = ({ articleOptions = null }) => {
  const loadingArticles = [1, 2, 3, 4, 5];

  const { paginationOptions } = usePagination();

  const {
    isSnackOpen,
    articles,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleFollow,
    handleSnackOpen,
  } = useArticleList(articleOptions);

  if (error) {
    return (
      <ErrorMessage variant="h3" margin="0 auto" alignSelf="center">
        An error occurred while fetching the articles
      </ErrorMessage>
    );
  }

  if (isFetching) {
    return (
      <Stack spacing={3}>
        {loadingArticles.map((article) => {
          return <LoadingArticle key={article} />;
        })}
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={3}>
        {articles ? (
          articles[0] ? (
            articles.map((article) => {
              return (
                <Article
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
            size={paginationOptions.size}
            hidePrevButton={paginationOptions.isShowButton}
            hideNextButton={paginationOptions.isShowButton}
            onChange={(_, page) => handleChangePage(page)}
            sx={{ alignSelf: "center" }}
          />
        ) : null}

        <AlertSnackbar
          color="error"
          open={isSnackOpen}
          handleClose={handleSnackOpen}>
          Failed to (un)favorite an article
        </AlertSnackbar>
      </Stack>
    </>
  );
};

export default ArticleList;
