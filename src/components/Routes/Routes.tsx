import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "../../pages/Profile";
import HomePage from "../../pages/HomePage";
import AccountManager from "../../pages/AccountManager";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <div>Error</div>,
    },

    {
      path: "/profile",
      element: <Profile />,
    },

    {
      path: "/sign-in",
      element: <AccountManager />,
    },
    {
      path: "/sign-up",
      element: <AccountManager />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
