import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useActions } from "../../../hooks/useActions.tsx";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";
import { getToken } from "../../../utils/getToken.ts";
import { useToggleArticleFollow } from "../../../hooks/useToggleArticleFollow.tsx";

type ArticleListProps = {
  author?: string;
  favorited?: string;
} | null;

export const useArticleList = (articleOptions: ArticleListProps) => {
  const { handleFollow } = useToggleArticleFollow();
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
  const maxPage = data ? Math.ceil(data.articlesCount / 5) : +currentPage + 4;

  useEffect(() => {
    if (data) {
      getArticles(data);
    }
  }, [getArticles, data]);

  function handleChangePage(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return {
    data,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
    handleFollow,
  };
};
