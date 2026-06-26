import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage";
import ProductFormPage from "../pages/ProductFormPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "products/new",
        element: <ProductFormPage />,
      },
      {
        path: "products/:id/edit",
        element: <ProductFormPage />,
      },
    ],
  },
]);

export default router;