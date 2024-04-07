import { Outlet, createBrowserRouter } from "react-router-dom"
import ShoppingCart from "../cart/cart"
import PageNotFound from "../PageNotFound/PageNotFound"
import Home  from "../Home/Home";
function Layout() {
    return (
      <>
        <Outlet />
      </>
    );
  }
  export const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />, 
        },
        {
          path: "/cart",
          element: <ShoppingCart />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);