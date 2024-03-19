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
import { FC } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

import GradientText from "../UIkit/GradientText";
import HeaderWrapper from "./Header.styles.tsx";
import { useHeader } from "./hooks/useHeader.tsx";
import { DEF_AVATAR } from "../../constants";

const Header: FC = () => {
  const { userData, isLogged } = useHeader();

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
                  <Typography>{userData.username}</Typography>

                  <Avatar
                    alt="avatar"
                    src={userData.image ? userData.image : DEF_AVATAR}
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
};

export default Header;
