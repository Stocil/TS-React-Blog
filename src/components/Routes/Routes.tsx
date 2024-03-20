import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "../../pages/Profile";
import HomePage from "../../pages/HomePage";
import AccountManager from "../../pages/AccountManager";
import Header from "../Header";
import { PROFILE_URL, SIGN_IN_URL, SIGN_UP_URL } from "../../constants";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <Header />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          errorElement: <div>Error</div>,
        },

        {
          path: PROFILE_URL,
          element: <Profile />,
        },

        {
          path: SIGN_IN_URL,
          element: <AccountManager />,
        },

        {
          path: SIGN_UP_URL,
          element: <AccountManager />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
