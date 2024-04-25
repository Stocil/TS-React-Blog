import { FC } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";

import HeaderWrapper, { HeaderMobileWrapper } from "./Header.styles.tsx";
import { useHeader } from "./hooks/useHeader.tsx";
import ThemeSwitch from "../ThemeSwitch";
import GradientText from "../UIkit/GradientText";
import { CREATE_ARTICLE_URL, SIGN_IN_URL } from "../../constants";
import UserAvatar from "../UserAvatar";
import HeaderBurgerMenu from "../HeaderBurgerMenu";

const Header: FC = () => {
  const {
    path,
    userData,
    isLogged,
    handleLogOut,
    navigate,

    menuOpen,
    handleToggleMenu,
  } = useHeader();

  return (
    <>
      <AppBar color="default">
        <Container>
          <Toolbar disableGutters>
            <Hidden mdDown>
              <HeaderWrapper>
                <Link to="/">
                  <GradientText variant="h4">Real world Blog</GradientText>
                </Link>

                <Stack direction="row">
                  <ThemeSwitch />

                  {isLogged ? (
                    <Stack direction="row" spacing={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => navigate(CREATE_ARTICLE_URL)}>
                        Create article
                      </Button>

                      <UserAvatar
                        username={userData.username}
                        userImage={userData.image}
                      />

                      <IconButton onClick={handleLogOut}>
                        <LogoutIcon color="error" />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Link to={SIGN_IN_URL} state={{ prevPath: path }}>
                      <Button variant="gradient">Sign in</Button>
                    </Link>
                  )}
                </Stack>
              </HeaderWrapper>
            </Hidden>

            <Hidden mdUp>
              <HeaderMobileWrapper>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleToggleMenu}>
                  <MenuIcon />
                </IconButton>

                {isLogged ? (
                  <UserAvatar
                    username={userData.username}
                    userImage={userData.image}
                  />
                ) : (
                  <Link to={SIGN_IN_URL} state={{ prevPath: path }}>
                    <Button variant="gradient">Sign in</Button>
                  </Link>
                )}
              </HeaderMobileWrapper>
            </Hidden>
          </Toolbar>
        </Container>

        <HeaderBurgerMenu
          open={menuOpen}
          path={path}
          username={userData.username}
          isLogged={!!isLogged}
          handleLogOut={handleLogOut}
          handleToggleMenu={handleToggleMenu}
        />
      </AppBar>

      <Box component="main" pt={10}>
        <Outlet />
      </Box>
    </>
  );
};

export default Header;
