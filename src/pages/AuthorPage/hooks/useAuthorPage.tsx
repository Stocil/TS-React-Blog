import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useFollowToUserMutation,
  useGetProfileQuery,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";

import { PROFILE_URL, SIGN_IN_URL } from "../../../constants";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { getToken } from "../../../utils/getToken.ts";
import { useEffect } from "react";

export const useAuthorPage = () => {
  const { username } = useParams();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();

  const navigate = useNavigate();
  const path = useLocation().pathname;

  useEffect(() => {
    if (user && user.username === username) {
      navigate(PROFILE_URL, { replace: true });
    }
  }, [navigate, username, user]);

  const { data, isFetching, error } = useGetProfileQuery({
    token: token,
    username: username ? username : "",
  });

  function handleFollow(isFollow: boolean) {
    if (token && data) {
      if (isFollow) {
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
    data,
    isFetching,
    error,
    handleFollow,
  };
};
