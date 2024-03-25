import { FC } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Stack, Typography } from "@mui/material";

import { ArticleTag } from "../UIkit/ArticleTag/ArticleTag.tsx";
import {
  ArticleDescription,
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleUserAvatar,
  ArticleUserInner,
  ArticleUserWrapper,
  ArticleWrapper,
  HtmlTooltip,
} from "./Article.styles.tsx";
import { ArticleType } from "../../types/articles.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";
import { AddToFollowerData } from "../../types/user.tsx";

type ArticleProps = {
  article: ArticleType;
  isFollow: boolean;
  onFollow: (userToFollow: AddToFollowerData, isFollow: boolean) => void;
};

const Article: FC<ArticleProps> = ({ article, onFollow, isFollow }) => {
  const data = new Date(article.createdAt).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={1}>
        <ArticleInfoWrapper>
          <Link to={article.slug}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ wordBreak: "break-all" }}>
              {getLimitedString(article.title, 120)}
            </Typography>
          </Link>

          <Stack direction="row" spacing="4px">
            {article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}

            <Typography>{article.favoritesCount}</Typography>
          </Stack>
        </ArticleInfoWrapper>

        <ArticleTagsWrapper>
          {article.tagList
            ? article.tagList.map((tag, index) => {
                if (index < 6 && tag != "") {
                  return (
                    <ArticleTag key={tag + index}>
                      {getLimitedString(tag, 10)}
                    </ArticleTag>
                  );
                }
              })
            : null}
        </ArticleTagsWrapper>

        <ArticleDescription>
          {getLimitedString(article.description, 500)}
        </ArticleDescription>
      </Stack>

      <ArticleUserWrapper>
        <ArticleUserInner>
          <Stack textAlign="right">
            <Typography variant="h6">{article.author.username}</Typography>

            <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
              {data}
            </Typography>
          </Stack>

          <HtmlTooltip
            arrow
            placement="top"
            title={
              <Stack direction="row" spacing={2}>
                <ArticleUserAvatar
                  alt="article author avatar"
                  src={article.author.image}
                  sx={{
                    border: (theme) =>
                      isFollow
                        ? `3px solid ${theme.palette.secondary.main}`
                        : null,
                  }}
                />

                <Stack spacing={1}>
                  <Typography>{article.author.username}</Typography>
                  <Button onClick={() => onFollow(article.author, isFollow)}>
                    {isFollow ? "Unfollow" : "Follow"}
                  </Button>
                </Stack>
              </Stack>
            }>
            <ArticleUserAvatar
              alt="article author avatar"
              src={article.author.image}
              sx={{
                border: (theme) =>
                  isFollow ? `3px solid ${theme.palette.secondary.main}` : null,
              }}
            />
          </HtmlTooltip>
        </ArticleUserInner>
      </ArticleUserWrapper>
    </ArticleWrapper>
  );
};

export default Article;
