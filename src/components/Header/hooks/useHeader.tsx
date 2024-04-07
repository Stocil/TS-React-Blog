import { useTypedSelector } from "../../../hooks/useTypedSelector.tsx";
import { useActions } from "../../../hooks/useActions.tsx";
import { LOCAL_STORAGE_USER_KEY } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";

export function useHeader() {
  const path = useLocation().pathname;
  const userData = useTypedSelector((state) => state.user.user);
  const isLogged = userData.token;
  const { logOutUser } = useActions();

  const navigate = useNavigate();

  function handleLogOut() {
    logOutUser();
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  return { path, userData, isLogged, handleLogOut, navigate } as const;
}
