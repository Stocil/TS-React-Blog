import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useState } from "react";

type ArticleOptions = {
  author?: string;
  favorited?: string;
} | null;

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);
  const [profileArticles, setProfileArticles] = useState<"user" | "favorited">(
    "user"
  );

  const articleOptions: ArticleOptions =
    profileArticles === "user"
      ? {
          author: user.token ? user.username : "",
          favorited: "",
        }
      : {
          author: "",
          favorited: user.token ? user.username : "",
        };

  function handleChangeProfileArticles(mode: "user" | "favorited") {
    setProfileArticles(mode);
  }

  return {
    articleOptions,
    handleChangeProfileArticles,
  };
};
