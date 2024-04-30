import { FC } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuthorPage } from "./hooks/useAuthorPage.tsx";
import {
  AuthorArticlesControl,
  AuthorAvatar,
  AuthorSwitchButton,
} from "./AuthorPage.styles.tsx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import ErrorPage from "../ErrorPage";
import ArticleList from "../../components/ArticleList";
import { LoadingAuthorPage } from "../../components/Loading";
import { useArticleOptions } from "../../hooks/useArticleOptions.tsx";

const AuthorPage: FC = () => {
  const { username, author, isFetching, error, handleFollow } = useAuthorPage();
  const { articleOptions, handleChangeArticlesOption } = useArticleOptions(
    username ? username : ""
  );

  if (error) {
    return (
      <Container sx={{ mt: 8, mb: 4 }}>
        <ErrorPage>User not found</ErrorPage>
      </Container>
    );
  }

  if (isFetching) {
    return (
      <Container sx={{ mt: 8, mb: 4 }}>
        <LoadingAuthorPage />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {author ? (
        <Stack spacing={5}>
          <Stack spacing={3} alignItems="center">
            <AuthorAvatar
              alt="author avatar"
              src={author.image}
              sx={{
                border: (theme) =>
                  author.following
                    ? `5px solid ${theme.palette.secondary.main}`
                    : null,
              }}
            />

            <Stack spacing={2} alignItems="center">
              <Typography component="h3" variant="h4" textAlign="center">
                {author.username}
              </Typography>

              <Button
                sx={{ maxWidth: 110 }}
                size="large"
                startIcon={
                  author.following ? <PersonRemoveIcon /> : <PersonAddIcon />
                }
                onClick={handleFollow}>
                {author.following ? "Unfollow" : "Follow"}
              </Button>
            </Stack>
          </Stack>

          <AuthorArticlesControl>
            <AuthorSwitchButton
              sx={{ ml: { xs: 0, sm: 9 } }}
              size="large"
              onClick={() => handleChangeArticlesOption("user")}>
              Author articles
            </AuthorSwitchButton>

            <CompareArrowsIcon fontSize="large" />

            <AuthorSwitchButton
              size="large"
              color="secondary"
              onClick={() => handleChangeArticlesOption("favorited")}>
              Author favorited articles
            </AuthorSwitchButton>
          </AuthorArticlesControl>

          <ArticleList articleOptions={articleOptions} />
        </Stack>
      ) : null}
    </Container>
  );
};

export default AuthorPage;
