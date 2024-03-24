import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Stack, Typography } from "@mui/material";
import { ArticleTag } from "../UIkit/ArticleTag/ArticleTag.tsx";
import {
  ArticleDescription,
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleUserAvatar,
  ArticleUserInner,
  ArticleUserWrapper,
  ArticleWrapper,
} from "./Article.styles.tsx";
import { FC } from "react";
import { ArticleType } from "../../types/articles.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";
import { Link } from "react-router-dom";

const Article: FC<{ article: ArticleType }> = ({ article }) => {
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
                if (index < 6) {
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

          <ArticleUserAvatar
            alt="article author avatar"
            src={article.author.image}
          />
        </ArticleUserInner>
      </ArticleUserWrapper>
    </ArticleWrapper>
  );
};

export default Article;
