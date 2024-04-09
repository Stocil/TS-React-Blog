import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";

import { SingleArticleErrorButton } from "../SingleArticle/SingleArticle.styles.tsx";
import { FourOFour } from "./ErrorPage.styles.tsx";

type ErrorPageProps = {
  children: ReactNode;
  error?: string;
};

const ErrorPage: FC<ErrorPageProps> = ({ children, error = "404" }) => {
  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Stack textAlign="center" spacing={2}>
        <FourOFour variant="h2">{error}</FourOFour>

        <Typography variant="h3" color="primary">
          {children}
        </Typography>

        <Link to="/">
          <SingleArticleErrorButton size="large" variant="gradient">
            Home
          </SingleArticleErrorButton>
        </Link>
      </Stack>
    </Container>
  );
};

export default ErrorPage;
