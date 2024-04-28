import {
  useFavoriteAnArticleMutation,
  useUnfavoriteAnArticleMutation,
} from "../store/api/articlesApi.ts";
import { SIGN_IN_URL } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "./useTypedSelector.tsx";
import { getToken } from "../utils/getToken.ts";
import { useActions } from "./useActions.tsx";
import { useState } from "react";

export const useToggleArticleFollow = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [isSnackOpen, setSnackOpen] = useState(false);
  const { toggleArticleFavorite } = useActions();

  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const [favoriteAnArticle] = useFavoriteAnArticleMutation();
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation();

  async function handleFollow(slug: string, isAlreadyFavorited: boolean) {
    if (token) {
      toggleArticleFavorite({ slug: slug, follow: !isAlreadyFavorited });

      if (isAlreadyFavorited) {
        const res = await unfavoriteAnArticle({
          token: token,
          slug: slug,
        });

        // @ts-expect-error If there is an error in the request,
        // it will work correctly, but if the request was successful, it does nothing
        if (res?.error) {
          toggleArticleFavorite({ slug: slug, follow: true });
          setSnackOpen(true);
        }
      } else {
        const res = await favoriteAnArticle({ token: token, slug: slug });

        // @ts-expect-error Same problem as problem in line 34-35
        if (res?.error) {
          toggleArticleFavorite({ slug: slug, follow: false });
          setSnackOpen(true);
        }
      }
    } else {
      navigate(SIGN_IN_URL, { replace: true, state: { prevPath: path } });
    }
  }

  function handleSnackOpen() {
    setSnackOpen((current) => !current);
  }

  return { isSnackOpen, handleFollow, handleSnackOpen };
};
