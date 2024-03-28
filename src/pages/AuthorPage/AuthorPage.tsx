import { FC } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuthorPage } from "./hooks/useAuthorPage.tsx";
import { ErrorMessage } from "../../components/UIkit/ErrorMessage/ErrorMessage.tsx";
import { AuthorAvatar } from "./AuthorPage.styles.tsx";
import ArticleList from "../../components/ArticleList";

const AuthorPage: FC = () => {
  const { data, isFetching, error, handleFollow } = useAuthorPage();

  if (isFetching) {
    return <Typography variant="h3">Loading...</Typography>;
  }

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
        <Stack spacing={3}>
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
              <Typography variant="h4">{data.profile.username}</Typography>
              <Button
                size="large"
                onClick={() => handleFollow(data.profile.following)}>
                {data.profile.following ? "Unfollow" : "Follow"}
              </Button>
            </Stack>
          </Stack>

          <ArticleList />
        </Stack>
      ) : null}
    </Container>
  );
};

export default AuthorPage;
