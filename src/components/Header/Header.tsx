import {
  AppBar,
  Avatar,
  Box,
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
import { DEF_AVATAR, PROFILE_URL, SIGN_IN_URL } from "../../constants";
import { Link, Outlet } from "react-router-dom";

const Header: FC = () => {
  const { path, userData, isLogged, handleLogOut } = useHeader();

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar disableGutters>
            <HeaderWrapper>
              <Link to="/">
                <GradientText variant="h4">Real world Blog</GradientText>
              </Link>

              {isLogged ? (
                <Stack direction="row" spacing={2}>
                  <Button size="small" variant="outlined" color="success">
                    Create article
                  </Button>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>{userData.username}</Typography>

                    <Link to={PROFILE_URL}>
                      <Avatar
                        alt="avatar"
                        src={userData.image ? userData.image : DEF_AVATAR}
                      />
                    </Link>
                  </Stack>

                  <IconButton onClick={handleLogOut}>
                    <LogoutIcon color="error" />
                  </IconButton>
                </Stack>
              ) : (
                <Link to={SIGN_IN_URL} state={{ prevPath: path }}>
                  <Button variant="gradient">Sign in</Button>
                </Link>
              )}
            </HeaderWrapper>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" pt={10}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
