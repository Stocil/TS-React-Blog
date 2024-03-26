import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";

type ArticleOptions = {
  author?: string;
  favorited?: string;
} | null;

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);
  const articleOptions: ArticleOptions = {
    author: user.token ? user.username : "",
    favorited: "",
  };

  const followingUsers = useTypedSelector((state) => state.user.following);

  return {
    followingUsers,
    articleOptions,
  };
};
