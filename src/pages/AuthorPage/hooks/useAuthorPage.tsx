import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useFollowToUserMutation,
  useGetProfileQuery,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";

import { PROFILE_URL, SIGN_IN_URL } from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { getToken } from "../../../utils/getToken.ts";
import { useActions } from "../../../hooks/useActions.tsx";

export const useAuthorPage = () => {
  const { username } = useParams();
  const { getAuthor } = useActions();
  const author = useTypedSelector((state) => state.author.author);
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { toggleArticleUserFollow, followOnAuthorPage } = useActions();
  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { data, isFetching, error } = useGetProfileQuery({
    token: token,
    username: username ? username : "",
  });

  useEffect(() => {
    if (user && user.username === username) {
      navigate(PROFILE_URL, { replace: true });
    }
  }, [navigate, username, user]);

  useEffect(() => {
    if (data) {
      getAuthor(data.profile);
    }
  }, [getAuthor, data]);

  function handleFollow() {
    if (token && data) {
      toggleArticleUserFollow({
        username: data.profile.username,
        isFollow: author.following,
      });

      followOnAuthorPage({ isFollow: author.following });

      if (author.following) {
        unfollow({ username: data.profile.username, token: token });
      } else {
        follow({ username: data.profile.username, token: token });
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true, state: { prevPath: path } });
    }
  }

  return {
    username,
    author,
    isFetching,
    error,
    handleFollow,
  };
};
