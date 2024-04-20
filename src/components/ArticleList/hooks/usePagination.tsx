export const usePagination = () => {
  const size = document.body.offsetWidth < 500 ? "medium" : "large";

  const paginationOptions = {
    size: size,
    isShowButton: size === "medium",
  };

  return { paginationOptions };
};
