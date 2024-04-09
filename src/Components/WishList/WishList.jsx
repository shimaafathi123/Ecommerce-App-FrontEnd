import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../store/wishlistSlice";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const isLoading = useSelector((state) => state.wishlist.isLoading);
  const error = useSelector((state) => state.wishlist.error);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId) => {
    await dispatch(removeFromWishlist(productId));
    dispatch(fetchWishlist());
  };

  return (
    <div>
      <h1>Wishlist</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && wishlist?.length === 0 && (
        <p>Your wishlist is empty</p>
      )}
      {!isLoading && !error && wishlist && (
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 gap-4 align-items-center mt-4">
            {wishlist?.map((item) => (
              <div key={item.id} className="col">
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "40vh", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h3 className="card-title font-weight-bold">{item.name}</h3>
                    <p className="card-text text-muted mb-2">
                      Description: {item.description}
                    </p>
                    <p className="card-text text-muted mb-2">Price: {item.price}</p>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="btn btn-primary w-100 mt-2"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
