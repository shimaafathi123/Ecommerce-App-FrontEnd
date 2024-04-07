import { Outlet, createBrowserRouter } from "react-router-dom"
import ShoppingCart from "../cart/cart"
import PageNotFound from "../PageNotFound/PageNotFound"

import Register from "../user/Register"
import Login from "../user/Login"
import Profile from "../user/Profile"

import CustomNavbar from "../Navbar/Navbar";

function Layout() {
    return (
      <>
        <Outlet />
      </>
    );
  }

export const router = createBrowserRouter([
    {
       element: <Layout></Layout>,
        children: [
        
            {
                path:"/cart",
                element: <ShoppingCart/>         
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
                element: <Profile/>         
              },
                
            {
              path:"*",
              element:<PageNotFound/>
            },
            {
              path:"/home",
              element:<CustomNavbar/>
            }
          ],
    }
])