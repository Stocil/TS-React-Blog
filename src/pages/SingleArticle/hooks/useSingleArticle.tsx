import { useParams } from "react-router-dom";
import { useGetSingleArticleQuery } from "../../../store/api/articlesApi.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { getToken } from "../../../utils/getToken.ts";

export const useSingleArticle = () => {
  const { slug } = useParams();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);

  const { data, error, isFetching } = useGetSingleArticleQuery({
    slug: slug as string,
    token: token,
  });

  console.log(data, error, isFetching);

  return { data, error, isFetching };
};
