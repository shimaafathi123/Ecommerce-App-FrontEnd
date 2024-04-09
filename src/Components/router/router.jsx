import { Outlet, createBrowserRouter } from "react-router-dom"
import ShoppingCart from "../cart/cart"
import PageNotFound from "../PageNotFound/PageNotFound"
import Home  from "../Home/Home";
import Register from "../user/Register"
import Login from "../user/Login"
import Profile from "../user/Profile"
import Account from "../user/Account"
import Logout from "../user/Logout"
import ProductDetail from "../productDetail/productDetail";
import RelatedProducts from "../productDetail/relatedProduct";
import WishList from "../WishList/WishList";
import Order from "../Order/Order";
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
          path: "/wishlist",
          element: <WishList />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path:"/register",
          element: <Register/>         
        },

        {
          path:"/login",
          element: <Login/>         
        },
        {
          path:"/profile",
          element: <Account/>         
        },
        {
          path:"/editAccount",
          element: <Profile/>         
        },
        {
          path:"/logout",
          element: <Logout/>         
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
        {
          path:"/products/:id",
          element:<ProductDetail/>
        },
        
      ],
    },
  ]);
