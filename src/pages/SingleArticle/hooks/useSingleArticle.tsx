import { useNavigate, useParams } from "react-router-dom";

import { getToken } from "../../../utils/getToken.ts";
import { useToggleArticleFollow } from "../../../hooks/useToggleArticleFollow.tsx";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../../store/api/articlesApi.ts";

export const useSingleArticle = () => {
  const navigate = useNavigate();
  const { handleFollow } = useToggleArticleFollow();
  const [deleteArticle] = useDeleteArticleMutation();
  const { slug } = useParams();

  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { data, error, isFetching } = useGetSingleArticleQuery({
    slug: slug as string,
    token: token,
  });

  const isAuthor = user.username === data?.article.author.username;

  function handleDeleteArticle() {
    const currentSlug = data?.article.slug as string;
    deleteArticle({ slug: currentSlug, token: token as string });

    navigate(-1);
  }

  return {
    data,
    error,
    isFetching,
    isAuthor,
    handleFollow,
    handleDeleteArticle,
  };
};
