import { Link } from "react-router-dom";
import { Container, Typography } from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Typography variant="h2">Home page</Typography>

      <Link to={"/profile"}>To userPage</Link>
    </Container>
  );
}

export default HomePage;
