import { AppBar, Button, Container, Toolbar } from "@mui/material";
import GradientText from "../UIkit/GradientText";
import HeaderWrapper from "./Header.styles.tsx";

function Header() {
  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters>
          <HeaderWrapper>
            <GradientText variant="h4">Real world Blog</GradientText>

            <Button variant="contained">Sign in</Button>
          </HeaderWrapper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
