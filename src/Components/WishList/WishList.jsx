import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setWishlist } from "../../store/wishlistSlice";
import { ToastContainer } from "react-toastify";

function WishList() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
 const token = localStorage.getItem('token')
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/wishlist",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
  })
      .then((response) => {
        console.log(response);
        dispatch(setWishlist(response.data[0].fav_items));
      })
      .catch((error) => console.log(error));
  }, []);

  const removeItem = (item) => {
    axios
      .delete(`http://localhost:8000/users/wishlist/items/${item.product.id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
  })
      .then((response) => {
        console.log(response)
        dispatch(
          setWishlist(
            wishlist.filter((wishlist_item) => wishlist_item.id !== item.id)
          )
        );
      })
      .catch((error) => console.log(error));
    console.log(wishlist);
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto mt-5">
        <div className="shadow p-4">
          <div className="d-flex justify-content-between border-bottom pb-3">
            <h1 className="font-weight-bold fs-4">Wish List</h1>
            <h2 className="font-weight-bold fs-4 text-uppercase">
              {wishlist.length}
              {wishlist.length > 1 ? " Items" : " Item"}
            </h2>
          </div>
          {wishlist.length ? (
            <>
              <div className="d-none d-lg-block">
                <table className="table w-100">
                  <tbody className="py-3">
                    {wishlist.map((item) => (
                      <tr key={item.id} className="my-3 text-center py-3">
                        <td className="d-flex align-items-center">
                          <div className="p-3">
                            <img
                              className="img-fluid"
                              src={item.product.image}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="d-flex flex-column justify-content-between flex-grow-1">
                            <span className="font-weight-bold fs-5">
                              {item.product.name}
                            </span>
                            <span className="text-danger fs-6">fashmart</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column justify-content-between ml-3">
                            <Button
                              variant="danger"
                              onClick={() => removeItem(item)}
                            >
                              Remove &nbsp; &nbsp;
                              <i className="fas fa-times text-white"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-grid gap-3 d-lg-none mx-auto">
                {wishlist.map((item) => (
                  <div
                    className="bg-white shadow rounded-lg p-4 hover-bg-gray-200 border border-gray-400 my-2"
                    key={`${item.id}+${item.product.id}`}
                  >
                    <div className="d-flex flex-column justify-content-center align-items-center text-lg">
                      <img
                        className="img-fluid"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                      <div className="d-flex flex-column align-items-center mt-3">
                        <span className="font-weight-bold fs-5">{item.product.name}</span>
                        <span className="text-danger">fashmart</span>
                        <div className="d-flex mt-2">
                          <Button
                            variant="danger"
                            onClick={() => removeItem(item)}
                          >
                            Remove &nbsp; &nbsp;
                            <i className="fas fa-times text-white"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white p-4 text-center">
              <p className="font-weight-bold fs-5">Nothing in your wish list.</p>
            </div>
          )}
        </div>
        <div>
          <Link
            to="/"
            className="d-flex font-weight-bold text-primary fs-5 mt-3"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}

export default WishList;
