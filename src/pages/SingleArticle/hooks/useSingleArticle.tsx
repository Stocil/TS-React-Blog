import { useParams } from "react-router-dom";

import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { getToken } from "../../../utils/getToken.ts";
import { useToggleArticleFollow } from "../../../hooks/useToggleArticleFollow.tsx";
import { useGetSingleArticleQuery } from "../../../store/api/articlesApi.ts";

export const useSingleArticle = () => {
  const { handleFollow } = useToggleArticleFollow();
  const { slug } = useParams();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { data, error, isFetching } = useGetSingleArticleQuery({
    slug: slug as string,
    token: token,
  });

  return { data, error, isFetching, handleFollow };
};
