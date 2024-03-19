import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";

export function useHeader() {
  const user = useTypedSelector((state) => state.user);
  const userData = user.user;
  const isLogged = true;

  return { userData, isLogged };
}
