import { FC } from "react";
import { Container } from "@mui/material";
import ArticleList from "../../components/ArticleList";

const HomePage: FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <ArticleList />
    </Container>
  );
};

export default HomePage;
