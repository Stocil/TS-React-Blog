import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";

export function useHeader() {
  const userData = useTypedSelector((state) => state.user.user);
  const isLogged = userData.token;

  return { userData, isLogged };
}
