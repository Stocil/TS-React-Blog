import { FC } from "react";
import { Button, Container, Typography } from "@mui/material";

import { useActions } from "../../hooks/useActions.ts";

const HomePage: FC = () => {
  const { registerUser, logInUser } = useActions();

  function testRegister() {
    registerUser({
      email: "jake@jake.jake",
      token: "jwt.token.here",
      username: "jake",
      bio: "I work at State Farm.",
      image:
        "https://i.pinimg.com/originals/69/3e/90/693e90297add0bf805e284ca669e00cd.jpg",
    });
  }

  function testLogIn() {
    logInUser({
      email: "jake@jake.jake log",
      token: "jwt.token.here log",
      username: "jake log",
      bio: "I work at State Farm. log",
      image:
        "https://i.pinimg.com/originals/69/3e/90/693e90297add0bf805e284ca669e00cd.jpg",
    });
  }

  return (
    <Container>
      <Typography variant="h2">Home page</Typography>

      <Button variant="gradient" onClick={testRegister}>
        Test Registration
      </Button>

      <Button variant="gradient" onClick={testLogIn}>
        Test Log-in
      </Button>
    </Container>
  );
};

export default HomePage;
