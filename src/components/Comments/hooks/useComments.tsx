import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { useGetCommentsQuery } from "../../../store/api/commentsApi.ts";
import { getToken } from "../../../utils/getToken.ts";
import { useParams } from "react-router-dom";

export const useComments = () => {
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const { slug } = useParams();

  const { data: commentsData, isFetching } = useGetCommentsQuery({
    token: token,
    slug: slug as string,
  });

  return { user, commentsData, isFetching };
};
