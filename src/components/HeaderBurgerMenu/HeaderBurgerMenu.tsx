import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, SwipeableDrawer, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";

import {
  HeaderBurgerInner,
  HeaderBurgerWrapper,
} from "./HeaderBurgerMenu.styles.tsx";
import GradientText from "../UIkit/GradientText";
import ThemeSwitch from "../ThemeSwitch";
import { PROFILE_URL, SIGN_IN_URL } from "../../constants";

type HeaderBurgerMenuProps = {
  open: boolean;
  path: string;
  username: string;
  isLogged: boolean;
  handleLogOut: () => void;
  handleToggleMenu: () => void;
};

const HeaderBurgerMenu: FC<HeaderBurgerMenuProps> = ({
  open,
  path,
  username,
  isLogged,
  handleLogOut,
  handleToggleMenu,
}) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onOpen={handleToggleMenu}
      onClose={handleToggleMenu}
      sx={{ position: "relative" }}>
      <HeaderBurgerWrapper>
        <Link to="/" onClick={handleToggleMenu} className="header-menu__link">
          <GradientText variant="h4">Real world Blog</GradientText>
        </Link>

        <HeaderBurgerInner>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              to="/"
              onClick={handleToggleMenu}
              className="header-menu__link">
              <HomeIcon />

              <Typography variant="h5" component="p">
                Home
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              to={PROFILE_URL}
              onClick={handleToggleMenu}
              className="header-menu__link">
              <AccountCircleIcon />

              <Typography variant="h5" component="p">
                Profile
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              to={"/" + `?author=${username}`}
              onClick={handleToggleMenu}
              className="header-menu__link">
              <ArticleIcon />

              <Typography variant="h5" component="p">
                My Articles
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              to={"/" + `?favorited=${username}`}
              onClick={handleToggleMenu}
              className="header-menu__link">
              <FavoriteIcon />

              <Typography variant="h5" component="p">
                Favourite
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Link
              to="/create"
              onClick={handleToggleMenu}
              className="header-menu__link">
              <AddBoxIcon />

              <Typography variant="h5" component="p">
                Create article
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center">
            <ThemeSwitch />

            <Typography variant="h5" component="p">
              Theme
            </Typography>
          </Stack>
        </HeaderBurgerInner>

        {isLogged ? (
          <Button
            onClick={() => {
              handleLogOut();
              handleToggleMenu();
            }}
            startIcon={<LogoutIcon />}
            color="error"
            size="large">
            Log out
          </Button>
        ) : (
          <Link
            to={SIGN_IN_URL}
            state={{ prevPath: path }}
            onClick={handleToggleMenu}>
            <Button variant="gradient" size="large">
              Sign in
            </Button>
          </Link>
        )}
      </HeaderBurgerWrapper>
    </SwipeableDrawer>
  );
};

export default HeaderBurgerMenu;
