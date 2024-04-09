import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaCartPlus, FaHeart } from 'react-icons/fa'; // Import icons
import RelatedProducts from './relatedProduct';
import './productDetail.css'; // Import CSS file
import CustomNavbar from './Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
                    <FaCartPlus className="button-icon" /> Add to Cart
                  </Button>
                  <Button variant="secondary" className="custom-button">
                    <FaHeart className="button-icon" /> Wishlist
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
