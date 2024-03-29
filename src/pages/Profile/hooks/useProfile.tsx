import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);

  return {
    user,
  };
};
