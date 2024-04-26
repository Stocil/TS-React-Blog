import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import {
  ErrorText,
  FourOFour,
  SingleArticleErrorButton,
} from "./ErrorPage.styles.tsx";

type ErrorPageProps = {
  children: ReactNode;
  error?: string;
};

const ErrorPage: FC<ErrorPageProps> = ({ children, error = "404" }) => {
  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      <Stack textAlign="center" spacing={2}>
        <FourOFour variant="h2">{error}</FourOFour>

        <ErrorText color="primary">{children}</ErrorText>

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
