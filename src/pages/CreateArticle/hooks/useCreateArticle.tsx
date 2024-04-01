import { useRef, useState } from "react";

export const useCreateArticle = () => {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [tagInputHelperText, setTagInputHelperText] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function onTextAreaFocus() {
    const label = document.body.querySelector(".create__textarea-label");
    label?.classList.add("focus");
  }

  function onTextAreaBlur() {
    const label = document.body.querySelector(".create__textarea-label");
    label?.classList.remove("focus");
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

  return {
    onTextAreaBlur,
    onTextAreaFocus,
    tags,
    tagInputRef,
    tagInputHelperText,
    addNewTag,
    deleteTag,
  };
};
