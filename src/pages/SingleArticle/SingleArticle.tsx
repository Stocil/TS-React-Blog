import { Button, Container, Stack, Typography } from "@mui/material";
import { useSingleArticle } from "./hooks/useSingleArticle.tsx";
import { Link } from "react-router-dom";

const SingleArticle = () => {
  const { isFetching, error, data } = useSingleArticle();

  if (error) {
    return (
      <Container sx={{ mt: 8, mb: 4 }}>
        <Stack textAlign="center" spacing={2}>
          <Typography fontSize="15rem" variant="h2" color="primary">
            404
          </Typography>

          <Typography variant="h3" color="primary">
            Article not found
          </Typography>

          <Link to="/">
            <Button
              sx={{ px: 3, py: 2, fontSize: "1rem" }}
              size="large"
              variant="gradient">
              Home
            </Button>
          </Link>
        </Stack>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {isFetching ? (
        <Typography>Loading...</Typography>
      ) : (
        <Typography>{data ? data.article.slug : null}</Typography>
      )}
    </Container>
  );
};

export default SingleArticle;
