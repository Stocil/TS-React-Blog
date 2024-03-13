import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "../../pages/Profile";
import HomePage from "../../pages/HomePage";

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
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
