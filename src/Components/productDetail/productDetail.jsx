import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import RelatedProducts from './relatedProduct'; 
import './productDetail.css'; 

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
    <div className="product-detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="product-detail-title">{product.name}</h2>
          <Card className="product-detail-card">
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title className="product-detail-card-title">{product.name}</Card.Title>
              <Card.Text className="product-detail-card-description">{product.description}</Card.Text>
              <Card.Text className="product-detail-card-price">Price: ${product.price}</Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
          <hr />
          <div className="product-detail-related-products">
            <RelatedProducts productId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
