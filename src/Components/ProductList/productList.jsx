import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';  
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './productList.css';
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
//import { addCartItem } from '../../store/cartSlice';
import CustomNavbar from '../Navbar/Navbar';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const dispatch = useDispatch();
    // const addItemToCart = (item) => {
    //     dispatch(addCartItem(item))
    // }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productResponse = await axios.get('http://127.0.0.1:8000/products/');
                setProducts(productResponse.data);

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
    }, []);

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
                    <Link to={`/products/${product.id}`} className="product-link"> {/* Link to product detail page */}
                        <div className="product-card">
                            <div className={`product-image ${quantityClass}`}>
                                <img src={product.image} alt={product.name} />
                                <p className={`product-quantity ${quantityClass}`}>{quantityText}: {product.quantity}</p>
                            </div>
                            <div className="product-card-content">
                                <h5 className="product-card-title">{product.name}</h5>
                                <p className="product-card-description">{product.description}</p>
                                <p className="product-card-price">Price: {product.price}$</p>
                                <p className="product-card-category">Category: {getCategoryNameById(product.category)}</p>
                                <div className="product-card-rating">
                                    Rating: {renderStarRating(product.rating)}
                                </div>
                                <div className="product-card-buttons">
                                    <button className="btn btn-primary" onClick={() => addItemToCart(product)}>Add to Cart</button>
                                    <button className="btn btn-secondary"><FaHeart /> Wishlist</button> {/* Replace text with heart icon */}
                                </div>
                            </div>
                        </div>
                    </Link>
                </MDBCol>
            );
        });
    };
    

    return (
<>
<CustomNavbar/>
        <div className="product-list-container">
                  

        <MDBContainer fluid className="my-5 text-center custom-scrollbar">
          <MDBRow className="g-4">{renderProducts()}</MDBRow>
        </MDBContainer>
      </div>
      </>

    );
};

export default ProductList;