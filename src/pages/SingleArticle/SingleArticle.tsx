import { FC } from "react";
import { Container, IconButton, Stack, Typography } from "@mui/material";

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

const SingleArticle: FC = () => {
  const {
    isFetching,
    isAuthor,
    error,
    data,
    handleFollow,
    handleDeleteArticle,
  } = useSingleArticle();

  if (error) {
    return <ErrorPage>Article not found</ErrorPage>;
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {isFetching ? (
        <Typography>Loading...</Typography>
      ) : data ? (
        <ArticleWrapper>
          <ArticleInfoWrapper>
            <Stack>
              <Stack direction="row" alignItems="center">
                <Typography
                  color="primary"
                  variant="h4"
                  sx={{ wordBreak: "break-all" }}>
                  {data.article.title}
                </Typography>

                <Stack direction="row" alignItems="center">
                  <IconButton
                    onClick={() =>
                      handleFollow(data.article.slug, data.article.favorited)
                    }>
                    {data.article.favorited ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>

                  <Typography>{data.article.favoritesCount}</Typography>
                </Stack>
              </Stack>

              <ArticleTagsWrapper>
                {data.article.tagList?.map((tag, index) => {
                  return (
                    <ArticleTag key={tag + index}>
                      {getLimitedString(tag, 10)}
                    </ArticleTag>
                  );
                })}
              </ArticleTagsWrapper>

              <SingleArticleDescription variant="subtitle2">
                {data.article.description}
              </SingleArticleDescription>
            </Stack>

            {isAuthor ? (
              <SingleArticleDeleteButton onClick={handleDeleteArticle}>
                Delete
              </SingleArticleDeleteButton>
            ) : null}
          </ArticleInfoWrapper>

          <Markdown
            remarkPlugins={[remarkGfm]}
            className="single-article__body">
            {data.article.body}
          </Markdown>
        </ArticleWrapper>
      ) : null}
    </Container>
  );
};

export default SingleArticle;
