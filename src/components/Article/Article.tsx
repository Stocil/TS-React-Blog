import { FC } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";

import { SINGLE_ARTICLE_URL } from "../../constants";
import { ArticleTag } from "../UIkit/ArticleTag/ArticleTag.tsx";
import {
  ArticleDescription,
  ArticleInfoWrapper,
  ArticleTagsWrapper,
  ArticleUserInner,
  ArticleUserWrapper,
  ArticleWrapper,
} from "./Article.styles.tsx";
import { ArticleType } from "../../types/articles.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";
import { ArticleAuthorData } from "../ArticleAuthorData/ArticleAuthorData.tsx";

type ArticleProps = {
  isLoading: boolean;
  article: ArticleType;
  onArticleFollow: (slug: string, isAlreadyFavorited: boolean) => void;
};

const Article: FC<ArticleProps> = ({ isLoading, article, onArticleFollow }) => {
  if (isLoading) {
    return (
      <ArticleWrapper elevation={8}>
        <Stack spacing={2}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={40}
            width={850}
          />

          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" height={25} width={60} />
            <Skeleton variant="rounded" height={25} width={60} />
            <Skeleton variant="rounded" height={25} width={60} />
          </Stack>

          <Skeleton
            animation="wave"
            variant="rounded"
            height={80}
            width={800}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          alignSelf="start">
          <Stack spacing={2}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height={14}
              width={120}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              height={14}
              width={120}
            />
          </Stack>

          <Skeleton variant={"circular"} width={50} height={50} />
        </Stack>
      </ArticleWrapper>
    );
  }

  return (
    <ArticleWrapper elevation={8}>
      <Stack spacing={1}>
        <ArticleInfoWrapper>
          <Link to={`${SINGLE_ARTICLE_URL}/${article.slug}`}>
            <Typography
              variant="h5"
              color="primary"
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
