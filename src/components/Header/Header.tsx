import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import GradientText from "../UIkit/GradientText";
import HeaderWrapper from "./Header.styles.tsx";

function Header() {
  const isLogged = true;

  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters>
          <HeaderWrapper>
            <GradientText variant="h4">Real world Blog</GradientText>

            {isLogged ? (
              <Stack direction="row" spacing={2}>
                <Button size="small" variant="outlined" color="success">
                  Create article
                </Button>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography>Stoc</Typography>

                  <Avatar
                    alt="avatar"
                    src="https://i.pinimg.com/originals/69/3e/90/693e90297add0bf805e284ca669e00cd.jpg"
                  />
                </Stack>

                <IconButton>
                  <LogoutIcon color="error" />
                </IconButton>
              </Stack>
            ) : (
              <Button variant="gradient">Sign in</Button>
            )}
          </HeaderWrapper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
