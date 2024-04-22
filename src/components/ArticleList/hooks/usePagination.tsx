export const usePagination = () => {
  const size = document.body.offsetWidth < 500 ? "medium" : "large";

  const paginationOptions = {
    size: size as "small" | "medium" | "large",
    isShowButton: size === "medium",
  };

  return { paginationOptions };
};
