import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useActions } from "../../../hooks/useActions.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import {
  useFavoriteAnArticleMutation,
  useGetArticlesQuery,
  useUnfavoriteAnArticleMutation,
} from "../../../store/api/articlesApi.ts";
import { getToken } from "../../../utils/getToken.ts";

type ArticleListProps = {
  author?: string;
  favorited?: string;
} | null;

export const useArticleList = (articleOptions: ArticleListProps) => {
  const { getArticles } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const currentAuthor = searchParams.get("author") || "";
  const currentFavorited = searchParams.get("favorited") || "";

  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { data, error, isFetching } = useGetArticlesQuery({
    token: token,
    page: +currentPage,
    author:
      articleOptions?.author || articleOptions?.author === ""
        ? articleOptions.author
        : currentAuthor,
    favorited:
      articleOptions?.favorited || articleOptions?.favorited === ""
        ? articleOptions.favorited
        : currentFavorited,
  });
  const maxPage = data ? Math.round(data.articlesCount / 5) : +currentPage + 4;

  const [favoriteAnArticle] = useFavoriteAnArticleMutation();
  const [unfavoriteAnArticle] = useUnfavoriteAnArticleMutation();

  useEffect(() => {
    if (data) {
      getArticles(data);
    }
  }, [getArticles, data]);

  function handleChangePage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  function handleAddArticleToFavorite(
    slug: string,
    isAlreadyFavorited: boolean
  ) {
    if (isAlreadyFavorited) {
      unfavoriteAnArticle({ token: token, slug: slug });
    } else {
      favoriteAnArticle({ token: token, slug: slug });
    }
  }

  return {
    data,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleAddArticleToFavorite,
  };
};
