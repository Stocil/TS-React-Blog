import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useActions } from "../../../hooks/useActions.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";

export const useArticleList = () => {
  const { getArticles } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const user = useTypedSelector((state) => state.user.user);
  let followed = useTypedSelector((state) => state.user.following);
  followed = user.token ? followed : [];

  const { data, error, isFetching } = useGetArticlesQuery(+currentPage);
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
