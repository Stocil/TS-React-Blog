import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";

export const useProfile = () => {
  const followingUsers = useTypedSelector((state) => state.user.following);

  return {
    followingUsers,
  };
};
