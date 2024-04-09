// RelatedProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa'; // Import icons
import './relatedProduct.css'; // Import CSS file

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${productId}/related`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  return (
    <div className="related-products-container">
      <h3>Related Products</h3>
      <div className="related-products-list">
        {relatedProducts.map(product => (
          <Card key={product.id} style={{ width: '18rem' }} className="related-product-card">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Button variant="primary" className="custom-button">
                <FaCartPlus className="button-icon" /> Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
