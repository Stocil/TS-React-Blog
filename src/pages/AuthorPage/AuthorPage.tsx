import { FC } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuthorPage } from "./hooks/useAuthorPage.tsx";
import { ErrorMessage } from "../../components/UIkit/ErrorMessage/ErrorMessage.tsx";
import {
  AuthorArticlesControl,
  AuthorAvatar,
  AuthorSwitchButton,
} from "./AuthorPage.styles.tsx";
import ArticleList from "../../components/ArticleList";
import { useArticleOptions } from "../../hooks/useArticleOptions.ts";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const AuthorPage: FC = () => {
  const { username, data, isFetching, error, handleFollow } = useAuthorPage();
  const { articleOptions, handleChangeArticlesOption } = useArticleOptions(
    username ? username : ""
  );

  if (error) {
    return (
      <Container sx={{ mt: 8, mb: 4 }}>
        <ErrorMessage variant="h5" margin="0 auto" maxWidth={725}>
          Perhaps such a user does not exist, try to reload the page
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {data ? (
        <Stack spacing={5}>
          {isFetching ? (
            <Typography variant="h3">Loading...</Typography>
          ) : (
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

                <Stack spacing={2}>
                  <Typography component="h3" variant="h4" textAlign="center">
                    {data.profile.username}
                  </Typography>
                  <Button
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
          )}

          <ArticleList articleOptions={articleOptions} />
        </Stack>
      ) : null}
    </Container>
  );
};

export default AuthorPage;
