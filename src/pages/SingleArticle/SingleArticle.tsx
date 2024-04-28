import { FC } from "react";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleWrapper,
  SingleArticleDeleteButton,
  SingleArticleDescription,
} from "./SingleArticle.styles.tsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleTag } from "../../components/UIkit/ArticleTag/ArticleTag.tsx";
import { useSingleArticle } from "./hooks/useSingleArticle.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";
import ErrorPage from "../ErrorPage";
import { Link } from "react-router-dom";
import { SINGLE_ARTICLE_URL } from "../../constants";
import Comments from "../../components/Comments";
import { LoadingSingleArticle } from "../../components/Loading";
import { AlertSnackbar } from "../../components/UIkit/Snackbar/AlertSnackbar.tsx";

const SingleArticle: FC = () => {
  const {
    article,
    isSnackOpen,
    isFetching,
    isAuthor,
    error,
    handleFollow,
    handleDeleteArticle,
    handleSnackOpen,
  } = useSingleArticle();

  if (error) {
    return <ErrorPage>Article not found</ErrorPage>;
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {isFetching ? (
        <LoadingSingleArticle />
      ) : article ? (
        <>
          <ArticleWrapper>
            <ArticleInfoWrapper>
              <Stack>
                <Stack direction="row" alignItems="center">
                  <Typography
                    color={(theme) => theme.palette.typography.main}
                    variant="h4"
                    sx={{ wordBreak: "break-all" }}>
                    {article.title}
                  </Typography>

                  <Stack direction="row" alignItems="center">
                    <IconButton
                      onClick={() =>
                        handleFollow(article.slug, article.favorited)
                      }>
                      {article.favorited ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>

                    <Typography>{article.favoritesCount}</Typography>
                  </Stack>
                </Stack>

                <ArticleTagsWrapper>
                  {article.tagList?.map((tag, index) => {
                    return (
                      <ArticleTag key={tag + index}>
                        {getLimitedString(tag, 10)}
                      </ArticleTag>
                    );
                  })}
                </ArticleTagsWrapper>

                <SingleArticleDescription variant="subtitle2">
                  {article.description}
                </SingleArticleDescription>
              </Stack>

              {isAuthor ? (
                <Stack direction="row" spacing={1}>
                  <Link to={`${SINGLE_ARTICLE_URL}/${article.slug}/edit`}>
                    <Button color="success" variant="outlined">
                      Edit
                    </Button>
                  </Link>

                  <SingleArticleDeleteButton onClick={handleDeleteArticle}>
                    Delete
                  </SingleArticleDeleteButton>
                </Stack>
              ) : null}
            </ArticleInfoWrapper>

            <Markdown
              remarkPlugins={[remarkGfm]}
              className="single-article__body">
              {article.body}
            </Markdown>
          </ArticleWrapper>

          <Comments />

          <AlertSnackbar
            color="error"
            open={isSnackOpen}
            handleClose={handleSnackOpen}>
            Failed to (un)favorite an article
          </AlertSnackbar>
        </>
      ) : null}
    </Container>
  );
};

export default SingleArticle;
