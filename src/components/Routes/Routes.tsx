import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "../../pages/Profile";
import HomePage from "../../pages/HomePage";
import AccountManager from "../../pages/AccountManager";
import Header from "../Header";
import {
  AUTHOR_PAGE_URL,
  CREATE_ARTICLE_URL,
  PROFILE_URL,
  SIGN_IN_URL,
  SIGN_UP_URL,
  SINGLE_ARTICLE_URL,
} from "../../constants";
import PrivateRoute from "../PrivateRoute";
import AuthorPage from "../../pages/AuthorPage";
import CreateArticle from "../../pages/CreateArticle";
import SingleArticle from "../../pages/SingleArticle";
import ErrorPage from "../../pages/ErrorPage";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <Header />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: PROFILE_URL,
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },

        {
          path: `${AUTHOR_PAGE_URL}/:username`,
          element: <AuthorPage />,
        },

        {
          path: `${SINGLE_ARTICLE_URL}/:slug`,
          element: <SingleArticle />,
        },

        {
          path: SIGN_IN_URL,
          element: <AccountManager />,
        },

        {
          path: SIGN_UP_URL,
          element: <AccountManager />,
        },

        {
          path: CREATE_ARTICLE_URL,
          element: (
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          ),
        },

        {
          path: `${SINGLE_ARTICLE_URL}/:slug/edit`,
          element: (
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          ),
        },
      ],

      errorElement: <ErrorPage>Page not found</ErrorPage>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
