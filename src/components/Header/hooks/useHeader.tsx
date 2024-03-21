import { useTypedSelector } from "../../../hooks/useTypedSelector.ts";
import { useActions } from "../../../hooks/useActions.ts";
import { LOCAL_STORAGE_USER_KEY } from "../../../constants";
import { useLocation } from "react-router-dom";

export function useHeader() {
  const path = useLocation().pathname;
  const userData = useTypedSelector((state) => state.user.user);
  const isLogged = userData.token;
  const { logOutUser } = useActions();

  function handleLogOut() {
    logOutUser();
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  return { path, userData, isLogged, handleLogOut } as const;
}
