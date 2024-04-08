import { Container, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import {
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleWrapper,
  FourOFour,
  SingleArticleDeleteButton,
  SingleArticleDescription,
  SingleArticleErrorButton,
} from "./SingleArticle.styles.tsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleTag } from "../../components/UIkit/ArticleTag/ArticleTag.tsx";
import { useSingleArticle } from "./hooks/useSingleArticle.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";

const SingleArticle = () => {
  const {
    isFetching,
    isAuthor,
    error,
    data,
    handleFollow,
    handleDeleteArticle,
  } = useSingleArticle();

  if (error) {
    return (
      <Container sx={{ mt: 8, mb: 4 }}>
        <Stack textAlign="center" spacing={2}>
          <FourOFour variant="h2">404</FourOFour>

          <Typography variant="h3" color="primary">
            Article not found
          </Typography>

          <Link to="/">
            <SingleArticleErrorButton size="large" variant="gradient">
              Home
            </SingleArticleErrorButton>
          </Link>
        </Stack>
      </Container>
    );
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
