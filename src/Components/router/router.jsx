import { Outlet, createBrowserRouter } from "react-router-dom"
import ShoppingCart from "../cart/cart"
import PageNotFound from "../PageNotFound/PageNotFound"
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
          /*  {
              path: "/",
              element: <Home />,
            },
            {
              path:"/products/:productID",
              element: <ProductDetails/>
            },
            {
              path:"/register",
              element: <Register/>
            },
            {
              path:"/user",
              element: <Profile/>         }
            ,*/
            {
                path:"/cart",
                element: <ShoppingCart/>         },
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