import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useActions } from "../../../hooks/useActions.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";

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
  let followed = useTypedSelector((state) => state.user.following);
  followed = user.token ? followed : [];

  const { data, error, isFetching } = useGetArticlesQuery({
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
    followed,
    isFetching,
    error,
    currentPage,
    maxPage,
    handleChangePage,
  };
};
