import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { getToken } from "../../../utils/getToken.ts";
import {
  useFollowToUserMutation,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";
import { FollowingUserData } from "../../../types/user.tsx";
import { SIGN_IN_URL } from "../../../constants";

export const useArticleAuthorData = (data: string | null = null) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const currentUsername = user.username;

  const [follow] = useFollowToUserMutation();
  const [unfollow] = useUnfollowFromUserMutation();

  const formattedData = new Date(data ? data : "").toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function onFollow(userToFollow: FollowingUserData, isFollow: boolean) {
    if (token) {
      if (isFollow) {
        unfollow({ username: userToFollow.username, token: token });
      } else {
        follow({ username: userToFollow.username, token: token });
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true, state: { prevPath: path } });
    }
  }

  return { formattedData, onFollow, currentUsername };
};
