import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useState } from "react";

type ArticleOptions = {
  author?: string;
  favorited?: string;
} | null;

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);
  const [profileArticles, setProfileArticles] = useState<"user" | "favorited">(
    "favorited"
  );

  const articleOptions: ArticleOptions =
    profileArticles === "user"
      ? {
          author: user.token ? user.username : "",
          favorited: "",
        }
      : {
          author: "",
          favorited: "modernt",
        };

  const followingUsers = useTypedSelector((state) => state.user.following);

  return {
    followingUsers,
    articleOptions,
  };
};
