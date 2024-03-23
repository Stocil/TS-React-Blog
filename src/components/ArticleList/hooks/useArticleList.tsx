import { useSearchParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../../store/api/articlesApi.ts";

export const useArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    offset: "0",
  });
  const currentOffset = searchParams.get("page") * 5 || "0";
  const { data, isLoading, error } = useGetArticlesQuery(+currentOffset);

  console.log(data, isLoading, error);

  function handleChangePage() {
    searchParams.set('page': )
  }

  return {
    isLoading,
    currentOffset,
  };
};
