// RelatedProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link component
import './relatedProduct.css'; // Import CSS file
import { useDispatch } from 'react-redux'; 
//import { addToCart  } from '../../store/cartSlice'


const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`https://ecommerce-app-backend-ol18.onrender.com/products/${productId}/related`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product)); 
  // };

  return (
    <div className="related-products-container">
      <h3 className='product'>Related Products</h3>
      <div className="related-products-list">
        {relatedProducts.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="related-product-link">
            <Card style={{ width: '18rem' }} className="related-product-card">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" className="custom-button" onClick={() => handleAddToCart(product)}>
                  <FaCartPlus className="button-icon" /> Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
