import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa'; // Import icons
import RelatedProducts from './relatedProduct';
import './productDetail.css'; // Import CSS file
import CustomNavbar from './Navbar';
import { useDispatch,useSelector } from 'react-redux';
//import { addCartItem } from '../../store/cartSlice';
import { setWishlist } from "../../store/wishlistSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  // const dispatch = useDispatch();
  // const addItemToCart = (item) => {
  //     dispatch(addCartItem(item))
  // }
  const addToWishlist = () => {
  //   if (!user.username) {
  //     navigate("/login");
  //     return;
  //   }
    const existed = wishlist.findIndex((item) => item.product.id === id);
    if (existed === -1) {
      axios
        .post(`users/wishlist/items/${id}`)
        .then((response) => {
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
                  <Button variant="primary" className="custom-button">
                    <FaCartPlus className="button-icon" onClick={() => addItemToCart(product)}/> Add to Cart
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
