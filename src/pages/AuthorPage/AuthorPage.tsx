import { FC } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuthorPage } from "./hooks/useAuthorPage.tsx";
import {
  AuthorArticlesControl,
  AuthorAvatar,
  AuthorSwitchButton,
} from "./AuthorPage.styles.tsx";
import ArticleList from "../../components/ArticleList";
import { useArticleOptions } from "../../hooks/useArticleOptions.tsx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ErrorPage from "../ErrorPage";
import { LoadingAuthorPage } from "../../components/Loading";

const AuthorPage: FC = () => {
  const { username, data, isFetching, error, handleFollow } = useAuthorPage();
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
      {data ? (
        <Stack spacing={5}>
          <>
            <Stack spacing={3} alignItems="center">
              <AuthorAvatar
                alt="author avatar"
                src={data.profile.image}
                sx={{
                  border: (theme) =>
                    data.profile.following
                      ? `5px solid ${theme.palette.secondary.main}`
                      : null,
                }}
              />

              <Stack spacing={2} alignItems="center">
                <Typography component="h3" variant="h4" textAlign="center">
                  {data.profile.username}
                </Typography>

                <Button
                  sx={{ maxWidth: 100 }}
                  size="large"
                  onClick={() => handleFollow(data.profile.following)}>
                  {data.profile.following ? "Unfollow" : "Follow"}
                </Button>
              </Stack>
            </Stack>

            <AuthorArticlesControl>
              <AuthorSwitchButton
                sx={{ ml: 9 }}
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
          </>

          <ArticleList articleOptions={articleOptions} />
        </Stack>
      ) : null}
    </Container>
  );
};

export default AuthorPage;
