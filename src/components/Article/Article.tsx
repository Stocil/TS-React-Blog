import { Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ArticleTag } from "../UIkit/ArticleTag/ArticleTag.tsx";
import {
  ArticleInfoWrapper,
  ArticleUserAvatar,
  ArticleUserInner,
  ArticleUserWrapper,
  ArticleWrapper,
} from "./Article.styles.tsx";

const Article = () => {
  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={1}>
        <ArticleInfoWrapper>
          <Typography variant="h4" color="primary">
            Some article title
          </Typography>

          <Stack direction="row" spacing="4px">
            <FavoriteBorderIcon />
            <Typography>12</Typography>
          </Stack>
        </ArticleInfoWrapper>

        <Stack direction="row" spacing={1}>
          <ArticleTag>Tag1</ArticleTag>
          <ArticleTag>Tag1</ArticleTag>
        </Stack>

        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Stack>

      <ArticleUserWrapper>
        <ArticleUserInner>
          <Stack textAlign="right">
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
              March 5, 2020
            </Typography>
          </Stack>
          <ArticleUserAvatar alt="article author avatar" />
        </ArticleUserInner>
      </ArticleUserWrapper>
    </ArticleWrapper>
  );
};

export default Article;
