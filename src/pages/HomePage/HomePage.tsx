import { FC } from "react";
import { Container } from "@mui/material";
import Article from "../../components/Article";

const HomePage: FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Article />
    </Container>
  );
};

export default HomePage;
