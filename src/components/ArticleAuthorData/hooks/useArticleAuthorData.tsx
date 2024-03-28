import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { getToken } from "../../../utils/getToken.ts";
import {
  useFollowToUserMutation,
  useUnfollowFromUserMutation,
} from "../../../store/api/userApi.ts";
import { FollowingUserData } from "../../../types/user.tsx";
import { SIGN_IN_URL } from "../../../constants";

export const useArticleAuthorData = (data: string | null = null) => {
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

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
      } else {
        follow({ username: userToFollow.username, token: token });
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true });
    }
  }

  return { formattedData, onFollow };
};
