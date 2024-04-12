import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import {
  useCreateCommentsMutation,
  useGetCommentsQuery,
} from "../../../store/api/commentsApi.ts";
import { getToken } from "../../../utils/getToken.ts";
import { useParams } from "react-router-dom";
import { useRef } from "react";

export const useComments = () => {
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token);
  const { slug } = useParams();
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { data: commentsData, isFetching } = useGetCommentsQuery({
    token: token,
    slug: slug as string,
  });

  const [createComment] = useCreateCommentsMutation();

  function handleCreateComment() {
    const comment = commentInputRef.current
      ? commentInputRef.current.value
      : "";

    if (comment === "") return;

    console.log(comment);

    createComment({
      token: token as string,
      slug: slug as string,
      comment: { body: comment },
    });
  }

  return {
    user,
    commentsData,
    isFetching,
    commentInputRef,
    handleCreateComment,
  };
};
