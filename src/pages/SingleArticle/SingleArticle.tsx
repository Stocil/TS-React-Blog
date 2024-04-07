import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useSingleArticle } from "./hooks/useSingleArticle.tsx";
import { Link } from "react-router-dom";
import {
  ArticleTagsWrapper,
  ArticleWrapper,
  FourOFour,
  SingleArticleErrorButton,
} from "./SingleArticle.styles.tsx";
import { ArticleTag } from "../../components/UIkit/ArticleTag/ArticleTag.tsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SingleArticle = () => {
  const { isFetching, error, data, handleFollow } = useSingleArticle();

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

  // TODO: add MD component
  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {isFetching ? (
        <Typography>Loading...</Typography>
      ) : data ? (
        <ArticleWrapper>
          <Stack>
            <Stack direction="row" alignItems="center">
              <Typography color="primary" variant="h4">
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
                return <ArticleTag key={tag + index}>{tag}</ArticleTag>;
              })}
            </ArticleTagsWrapper>

            <Typography variant="subtitle2" mt={2} sx={{ opacity: 0.7 }}>
              {data.article.description}
            </Typography>
          </Stack>

          <Typography>{data.article.body}</Typography>
        </ArticleWrapper>
      ) : null}
    </Container>
  );
};

export default SingleArticle;
