import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import FavoritesPage from "../pages/FavoritesPage";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/favorites", element: <FavoritesPage /> }
    ]
  }
]);
