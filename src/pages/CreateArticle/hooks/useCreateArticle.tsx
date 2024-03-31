export const useCreateArticle = () => {
  function onTextAreaFocus() {
    const label = document.body.querySelector(".create__textarea-label");
    label?.classList.add("focus");
  }

  function onTextAreaBlur() {
    const label = document.body.querySelector(".create__textarea-label");
    label?.classList.remove("focus");
  }

  return { onTextAreaBlur, onTextAreaFocus };
};
