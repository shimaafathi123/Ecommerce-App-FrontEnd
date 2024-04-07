import { Outlet, createBrowserRouter } from "react-router-dom"
import ShoppingCart from "../cart/cart"
import PageNotFound from "../PageNotFound/PageNotFound"
import Home  from "../Home/Home";

import Register from "../user/Register"
import Login from "../user/Login"
import Profile from "../user/Profile"
function Layout() {
    return (
      <>
        <Outlet />
      </>
    );
  }
  export const router = createBrowserRouter([
    {
<<<<<<< HEAD
       element: <Layout></Layout>,
        children: [
        
            {
                path:"/cart",
                element: <ShoppingCart/>         
              },
=======
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
          path:"/register",
          element: <Register/>         
        },
>>>>>>> f7ca6dc8b643ca34c715086e197b64003d40a5f4

        {
          path:"/login",
          element: <Login/>         
        },
        {
          path:"/profile",
          element: <Profile/>         
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);