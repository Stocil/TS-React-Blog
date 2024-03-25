import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getToken } from "../../../utils/getToken.ts";
import { useActions } from "../../../hooks/useActions.ts";
import { SIGN_IN_URL } from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";
import {
  useFollowToUserMutation,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";
import { AddToFollowerData } from "../../../types/user.tsx";

export const useArticleList = () => {
  const navigate = useNavigate();
  const { getArticles, addToFollower, removeFromFollower } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const user = useTypedSelector((state) => state.user.user);
  let followed = useTypedSelector((state) => state.user.following);
  followed = user.token ? followed : [];

  const token = getToken(user.token);

  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();
  const { data, error, isFetching } = useGetArticlesQuery(+currentPage);
  const maxPage = data ? Math.round(data.articlesCount / 5) : +currentPage + 4;

  useEffect(() => {
    if (data) {
      getArticles(data);
    }
  }, [getArticles, data]);

  function handleFollowToUser(
    userToFollow: AddToFollowerData,
    isFollow: boolean
  ) {
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

  function handleChangePage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return {
    data,
    followed,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleFollowToUser,
  };
};
