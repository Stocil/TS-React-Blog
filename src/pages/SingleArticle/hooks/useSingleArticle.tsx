import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { getToken } from "../../../utils/getToken.ts";
import { useToggleArticleFollow } from "../../../hooks/useToggleArticleFollow.tsx";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../../store/api/articlesApi.ts";
import { useActions } from "../../../hooks/useActions.tsx";

export const useSingleArticle = () => {
  const navigate = useNavigate();
  const { isSnackOpen, handleFollow, handleSnackOpen } =
    useToggleArticleFollow();
  const [deleteArticle] = useDeleteArticleMutation();
  const { slug } = useParams();
  const { getSingleArticle } = useActions();

  const user = useTypedSelector((state) => state.user.user);
  const article = useTypedSelector((state) => state.articles.singleArticle);
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

  useEffect(() => {
    if (data) {
      getSingleArticle(data.article);
    }
  }, [getSingleArticle, data]);

  return {
    article,
    isSnackOpen,
    error,
    isFetching,
    isAuthor,
    handleFollow,
    handleDeleteArticle,
    handleSnackOpen,
  };
};
