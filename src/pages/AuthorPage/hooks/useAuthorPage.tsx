import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowToUserMutation,
  useGetProfileQuery,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { getToken } from "../../../utils/getToken.ts";
import { PROFILE_URL, SIGN_IN_URL } from "../../../constants";

export const useAuthorPage = () => {
  const { username } = useParams();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();

  const navigate = useNavigate();
  if (user && user.username === username) {
    navigate(PROFILE_URL, { replace: true });
  }

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
      navigate(SIGN_IN_URL, { replace: true });
    }
  }

  return { data, isFetching, error, handleFollow };
};
