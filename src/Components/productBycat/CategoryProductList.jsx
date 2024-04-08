import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';  
import ProductList from '../ProductList/productList';

const CategoryProductList = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({}); // Store categories as an object with ID as keys and name as values

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let apiUrl = 'http://127.0.0.1:8000/products/';
                if (categoryId) {
                    apiUrl += `category/${categoryId}/`; // Include category ID in the URL path if categoryId is provided
                }
                const productResponse = await axios.get(apiUrl);
                setProducts(productResponse.data);

                // Fetch categories separately
                const categoryResponse = await axios.get('http://127.0.0.1:8000/categories/');
                const categoriesData = categoryResponse.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<BsStarFill key={i} />);
        }

        if (hasHalfStar) {
            stars.push(<BsStarHalf key="half" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<BsStar key={`empty${i}`} />);
        }

        return stars;
    };

    const getCategoryNameById = (categoryId) => {
        return categories[categoryId] || 'Unknown Category';
    };

    const renderProducts = () => {
        return products.map((product) => {
            let quantityText = '';
            let quantityClass = '';

            if (product.quantity > 10) {
                quantityText = 'Available';
                quantityClass = 'available';
            } else if (product.quantity > 0) {
                quantityText = 'Low Stock';
                quantityClass = 'low-stock';
            } else {
                quantityText = 'Out of Stock';
                quantityClass = 'out-of-stock';
            }

            return (
                <MDBCol key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <div className="product-card">
                        <div className={`product-image ${quantityClass}`}>
                            <img src={product.image} alt={product.name} />
                            <p className={`product-quantity ${quantityClass}`}>{quantityText}: {product.quantity}</p>
                        </div>
                        <div className="product-card-content">
                            <h5 className="product-card-title">{product.name}</h5>
                            <p className="product-card-description">{product.description}</p>
                            <p className="product-card-price">Price: {product.price}$</p>
                            <p className="product-card-category">Category: {getCategoryNameById(product.category)}</p> {/* Render category */}
                            <div className="product-card-rating">
                                Rating: {renderStarRating(product.rating)}
                            </div>
                        </div>
                    </div>
                </MDBCol>
            );
        });
    };

    return (
        <div className="product-list-container">
            <MDBContainer fluid className="my-5 text-center">
                <h1 className="text-center mb-4">Products</h1>
                <MDBRow className="g-4">{renderProducts()}</MDBRow>
            </MDBContainer>
        </div>
    );
};

export default CategoryProductList;