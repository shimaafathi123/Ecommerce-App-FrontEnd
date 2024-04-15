import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import RelatedProducts from './relatedProduct';
import './productDetail.css';
import CustomNavbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem ,updateCartItemQuantity} from '../../store/cartSlice';
import { setWishlist } from "../../store/wishlistSlice";
// import interceptorInstance from '../../axios/cartApi';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../cart/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  // const user = useSelector((state) => state.user);
  // const cart = useSelector((state) => state.cart.cart);
  // const [message, setMessage] = useState('');
  // const token = localStorage.getItem('token');

  // const navigate=useNavigate()

  // // Inside your addToCartHandler function

  // const addToCartHandler = () => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   const existed = cart.findIndex((cartItem) => cartItem.product.id === id);
  //   if (existed === -1) {
  //     interceptorInstance
  //       .post(`cart/add-to-cart/`, {quantity: 1,product:'${id}' })
  //       .then((response) => {
  //         dispatch(addCartItem(response.data)); // Dispatch action to add to cart
  //         setMessage('Item added to cart successfully'); // Set success message
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setMessage('Failed to add item to cart'); // Set error message
  //       });
  //   } else {
  //     interceptorInstance
  //       .patch(`cart/update-cart/${id}/`, { quantity: 1, action: "INCREASE",product:'${id}' })
  //       .then((response) => {
  //         dispatch(updateCartItemQuantity({ item: response.data, quantity: response.data.quantity }));
  //         setMessage('Item quantity updated successfully'); // Set success message
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setMessage('Failed to update item quantity'); // Set error message
  //       });
  //   }
  // };
  const addToWishlist = () => {
  //   if (!user.username) {
  //     navigate("/login");
  //     return;
  //   }
    const existed = wishlist.findIndex((item) => item.product.id === id);
    if (existed === -1) {
      axios
        .post(`http://127.0.0.1:8000/users/wishlist/items/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response)
          dispatch(setWishlist([...wishlist, response.data]));
        })
        .catch((error) => console.log(error));
    } else return;
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async () => {
    try {
      const data = await addToCart(product.Id);
      // Optionally provide feedback to the user
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Optionally handle error and provide feedback to the user
    }
  };
  return (
    <div>
      <CustomNavbar /> 
      <div className="product-detail-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2 className="product-detail-title">{product.name}</h2>
            <div className="product-detail-content">
              <div className="product-detail-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-detail-details">
                <p className="product-detail-description">{product.description}</p>
                <p className="product-detail-price">Price: ${product.price}</p>
                <div className="product-detail-buttons">
                  <Button variant="primary" className="custom-button" onClick={() => handleAddToCart()}>
                    <FaCartPlus className="button-icon" /> Add to Cart
                  </Button>
                  <Button variant="secondary" className="custom-button">
                    <FaHeart className="button-icon"onClick={() => addToWishlist(id)} /> Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="product-detail-related-products">
          <RelatedProducts productId={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
