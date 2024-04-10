import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateArticleMutation,
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "../../../store/api/articlesApi.ts";
import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { getToken } from "../../../utils/getToken.ts";

type CreateArticleFormInputs = {
  title: string;
  description: string;
  body: string;
};

export const useCreateArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInputHelperText, setTagInputHelperText] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [updateArticle] = useUpdateArticleMutation();
  const [createArticle] = useCreateArticleMutation();
  const user = useTypedSelector((state) => state.user.user);
  const token = getToken(user.token) as string;

  const {
    data: articleData,
    error: getArticleError,
    isFetching: isArticleLoading,
  } = useGetSingleArticleQuery({
    slug: slug as string,
    token: token,
  });
  const isAuthor = user?.username === articleData?.article.author.username;

  useEffect(() => {
    if (articleData?.article.tagList) {
      setTags(articleData?.article.tagList);
    }
  }, [articleData]);

  function onTextAreaFocus() {
    const label = document.body.querySelector(".create__textarea-label");
    label?.classList.add("focus");
  }

  function onTextAreaBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
    const label = document.body.querySelector(".create__textarea-label");

    if (e.target.value === "") {
      label?.classList.remove("focus");
    }
  }

  function addNewTag() {
    setTagInputHelperText("");
    if (tagInputRef.current && tagInputRef.current.value) {
      if (tags.includes(tagInputRef.current.value)) {
        setTagInputHelperText("Tag is already exist");
        return;
      }

      setTags([...tags, tagInputRef.current.value]);
      tagInputRef.current.value = "";
    }
  }

  function deleteTag(tagName: string) {
    const newTags = tags.filter((tag) => tag !== tagName);
    setTags(newTags);
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateArticleFormInputs>({
    mode: "onBlur",
  });

  const handleSubmitNewArticle: SubmitHandler<CreateArticleFormInputs> = async (
    formData
  ) => {
    const article = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: tags,
    };

    if (isAuthor && slug) {
      await updateArticle({
        article: article,
        slug: slug,
        token: token,
      })
        .then((res) => {
          if (res) navigate(`/article/${slug}`, { replace: true });
        })
        .catch((e) => {
          console.log(e);
        });

      return;
    }

    await createArticle({ article: article, token: token })
      .then((res) => {
        if (res) navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    register,
    isSubmitting,
    tags,
    tagInputRef,
    tagInputHelperText,
    addNewTag,
    deleteTag,
    onTextAreaBlur,
    onTextAreaFocus,
    handleSubmit,
    handleSubmitNewArticle,

    articleData,
    slug,
    isAuthor,
    getArticleError,
    isArticleLoading,
  };
};
