import { FC } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Stack, Typography } from "@mui/material";

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
  article: ArticleType;
  isFollow: boolean;
};

const Article: FC<ArticleProps> = ({ article, isFollow }) => {
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
          <ArticleAuthorData
            author={article.author}
            isFollow={isFollow}
            data={article.createdAt}
          />
        </ArticleUserInner>
      </ArticleUserWrapper>
    </ArticleWrapper>
  );
};

export default Article;
