import { useSearchParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";

export const useArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const { data, error, isFetching } = useGetArticlesQuery(+currentPage);
  const maxPage = data ? Math.round(data.articlesCount / 5) : +currentPage + 4;

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
  };
};
