import { useState } from "react";
import { ArticleOptions } from "../types/articles.tsx";
import { useSearchParams } from "react-router-dom";

export const useArticleOptions = (username: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileArticles, setProfileArticles] = useState<"user" | "favorited">(
    "user"
  );
  const articleOptions: ArticleOptions =
    profileArticles === "user"
      ? {
          author: username,
          favorited: "",
        }
      : {
          author: "",
          favorited: username,
        };

  function handleChangeArticlesOption(mode: "user" | "favorited") {
    setProfileArticles(mode);

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return { articleOptions, handleChangeArticlesOption };
};
