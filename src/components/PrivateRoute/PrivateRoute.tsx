import { FC, ReactNode } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector.tsx";
import { Navigate, useLocation } from "react-router-dom";
import { SIGN_IN_URL } from "../../constants";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const isLogged = !!useTypedSelector((state) => state.user.user.token);
  const path = useLocation().pathname;

  if (isLogged) {
    return children;
  }

  return <Navigate to={SIGN_IN_URL} state={{ prevPath: path }} />;
};

export default PrivateRoute;
