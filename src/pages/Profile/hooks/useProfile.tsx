import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";

export const useProfile = () => {
  const user = useTypedSelector((state) => state.user.user);

  return {
    user,
  };
};
