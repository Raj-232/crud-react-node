import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);