import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';  
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './productList.css';
import { setWishlist } from "../../store/wishlistSlice";
import { FaHeart } from 'react-icons/fa';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCartItem ,updateCartItemQuantity} from '../../store/cartSlice';
//import { addCartItem } from '../../store/cartSlice';
import CustomNavbar from '../Navbar/Navbar';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const wishlist = useSelector((state) => state.wishlist.wishlist);

    // const addItemToCart = (item) => {
    //     dispatch(addCartItem(item))
    // }
    const token= localStorage.getItem('token');
    const navigate=useNavigate()

    
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
    const addToCartHandler = (id) => {
        if (!token) {
          navigate("/login");
          return;
        }
        axios.post(`http://127.0.0.1:8000/cart/add-to-cart/`, { quantity: 1, product: id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          dispatch(addCartItem(products));
          setMessage('Item added to cart successfully');
        })
        .catch((error) => {
          console.log(error);
          setMessage('Failed to add item to cart');
        });
      };

      const addToWishlist = () => {
        if (!token) {
          navigate("/login");
          return;
        } 
         console.log(token);
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
                            <Link to={`/products/${product.id}`} className="product-link"> {/* Link to product detail page */}
                                <img src={product.image} alt={product.name} />
                                <p className={`product-quantity ${quantityClass}`}>{quantityText}: {product.quantity}</p>
                            </Link>
                        </div>
                        <div className="product-card-content">
                            <h5 className="product-card-title">{product.name}</h5>
                            <p className="product-card-description">{product.description}</p>
                            <p className="product-card-price">Price: {product.price}$</p>
                            <p className="product-card-category">Category: {getCategoryNameById(product.category)}</p>
                            <div className="product-card-rating">
                                Rating: {renderStarRating(product.rating)}
                            </div>
                        </div>
                        <div className="product-card-buttons">
                            <button className="btn btn-primary" onClick={() => addToCartHandler(product.id)}>Add to Cart</button>
                            <button className="btn btn-secondary" onClick={() => addToWishlist(product.id)}><FaHeart /> Wishlist</button> 
                        </div>
                    </div>
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
