import {
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
} from "../store/api/articlesApi.ts";
import { SIGN_IN_URL } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector.tsx";
import { getToken } from "../utils/getToken.ts";

export const useToggleArticleFollow = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const [favoriteAnArticle] = useFavoriteAnArticleMutation();
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation();

  function handleFollow(slug: string, isAlreadyFavorited: boolean) {
    if (token) {
      if (isAlreadyFavorited) {
        unfavoriteAnArticle({ token: token, slug: slug });
      } else {
        favoriteAnArticle({ token: token, slug: slug });
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true, state: { prevPath: path } });
    }
  }

  return { handleFollow };
};
