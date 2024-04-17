import { FC } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  ArticleDescription,
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleUserInner,
  ArticleUserWrapper,
  ArticleWrapper,
} from "./Article.styles.tsx";

import { SINGLE_ARTICLE_URL } from "../../constants";
import { ArticleType } from "../../types/articles.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";

import { ArticleTag } from "../UIkit/ArticleTag/ArticleTag.tsx";
import { ArticleAuthorData } from "../ArticleAuthorData/ArticleAuthorData.tsx";

type ArticleProps = {
  article: ArticleType;
  onArticleFollow: (slug: string, isAlreadyFavorited: boolean) => void;
};

const Article: FC<ArticleProps> = ({ article, onArticleFollow }) => {
  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={1}>
        <ArticleInfoWrapper>
          <Link to={`${SINGLE_ARTICLE_URL}/${article.slug}`}>
            <Typography
              variant="h5"
              color={(theme) => theme.palette.typography.main}
              sx={{ wordBreak: "break-all" }}>
              {getLimitedString(article.title, 120)}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => onArticleFollow(article.slug, article.favorited)}>
              {article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>

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
          <ArticleAuthorData
            author={article.author}
            isFollow={article.author.following}
            data={article.createdAt}
          />
        </ArticleUserInner>
      </ArticleUserWrapper>
    </ArticleWrapper>
  );
};

export default Article;
