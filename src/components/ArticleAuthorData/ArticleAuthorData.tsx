import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { ArticleUserAvatar } from "../Article/Article.styles.tsx";
import { FollowingUserData } from "../../types/user.tsx";
import { HtmlTooltip } from "./ArticleAuthorData.styles.tsx";
import { SIGN_IN_URL } from "../../constants";
import { useTypedSelector } from "../../hooks/useTypedSelector.ts";
import { getToken } from "../../utils/getToken.ts";
import { useNavigate } from "react-router-dom";
import {
  useFollowToUserMutation,
  useUnfollowFromUserMutation,
} from "../../store/api/userApi.ts";
import { useActions } from "../../hooks/useActions.ts";

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
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { addToFollower, removeFromFollower } = useActions();
  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();

  const formattedData = new Date(data ? data : "").toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function onFollow(userToFollow: FollowingUserData, isFollow: boolean) {
    if (user.token) {
      if (isFollow) {
        unfollow({ username: userToFollow.username, token: token });
        removeFromFollower(userToFollow.username);
      } else {
        follow({ username: userToFollow.username, token: token });
        addToFollower(userToFollow);
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true });
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      <Stack textAlign="right">
        <Typography variant="h6">{author.username}</Typography>

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
