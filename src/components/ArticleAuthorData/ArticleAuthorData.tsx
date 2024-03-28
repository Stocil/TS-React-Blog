import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { ArticleUserAvatar } from "../Article/Article.styles.tsx";
import { FollowingUserData } from "../../types/user.tsx";
import { HtmlTooltip } from "./ArticleAuthorData.styles.tsx";
import { getLimitedString } from "../../utils/getLimitedString.ts";
import { useArticleAuthorData } from "./hooks/useArticleAuthorData.tsx";

type ArticleAuthorDataProps = {
  author: FollowingUserData;
  isFollow: boolean;
  data?: string;
};

export const ArticleAuthorData: FC<ArticleAuthorDataProps> = ({
  author,
  isFollow,
  data = null,
}) => {
  const { formattedData, onFollow } = useArticleAuthorData(data);

  return (
    <Stack direction="row" spacing={1}>
      <Stack textAlign="right">
        <Typography variant="h6">
          {getLimitedString(author.username, 15)}
        </Typography>

        {data ? (
          <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
            {formattedData}
          </Typography>
        ) : null}
      </Stack>

      <HtmlTooltip
        arrow
        placement="top"
        title={
          <Stack direction="row" spacing={2}>
            <ArticleUserAvatar
              alt="article author avatar"
              src={author.image}
              sx={{
                border: (theme) =>
                  isFollow ? `3px solid ${theme.palette.secondary.main}` : null,
              }}
            />

            <Stack spacing={1}>
              <Typography>{author.username}</Typography>
              <Button onClick={() => onFollow(author, isFollow)}>
                {isFollow ? "Unfollow" : "Follow"}
              </Button>
            </Stack>
          </Stack>
        }>
        <ArticleUserAvatar
          alt="article author avatar"
          src={author.image}
          sx={{
            border: (theme) =>
              isFollow ? `3px solid ${theme.palette.secondary.main}` : null,
          }}
        />
      </HtmlTooltip>
    </Stack>
  );
};
