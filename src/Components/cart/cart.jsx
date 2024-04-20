import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart, updateCartItemQuantity, removeCartItem, setCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { increaseItemQuantity,decreaseItemQuantity } from '../../axios/cartApi';
import PaginationComponent from '../pagination/pagination';
import CustomNavbar from '../Navbar/Navbar';
import { fetchCart, removeFromCart } from '../../axios/cartApi'; // Import removeFromCart function

export default function UserCart() {
    const cart = useSelector((state) => state.cart.cart); 
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetchCart(token);
                    dispatch(setCart(response)); 
                } else {
                    console.error('Token is null');
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (cart && cart.cart_items && cart.cart_items.length > 0) {
            let total = 0;
            cart.cart_items.forEach((item) => {
                if (item.product && item.product.price) {
                    total += parseFloat(item.product.price) * item.quantity;
                }
            });
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClearCart = async () => {
        // Iterate through each item in the cart and remove it from the backend
        cart.cart_items.forEach(async (item) => {
            try {
                await removeFromCart(item.id); // Call removeFromCart function for each item
            } catch (error) {
                console.error('Error removing item from cart:', error);
            }
        });
        // After removing items from the backend, clear the cart in the Redux store
        dispatch(clearCart()); 
    };



    const increaseQuantity = async (itemId) => {
        try {
            await increaseItemQuantity(itemId);
            dispatch(updateCartItemQuantity({ id: itemId, action: 'INCREMENT' }));
        } catch (error) {
            console.error('Error increasing item quantity:', error);
        }
    };
    
    const decreaseQuantity = async (itemId) => {
        try {
            await decreaseItemQuantity(itemId);
            dispatch(updateCartItemQuantity({ id: itemId, action: 'DECREMENT' }));
        } catch (error) {
            console.error('Error decreasing item quantity:', error);
        }
    };

      
    
    const removeItemFromCart = async (itemId) => {
        try {
            // Remove the item from the backend/database
            await removeFromCart(itemId);
            // Dispatch the removeCartItem action to update the Redux state
            dispatch(removeCartItem({ id: itemId }));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCart = cart && cart.cart_items ? cart.cart_items.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = cart && cart.cart_items ? Math.ceil(cart.cart_items.length / itemsPerPage) : 0;
    const isLastPage = currentPage === totalPages;

    return (
        <>
            <CustomNavbar />
            <div className="container mt-5">
                <div className="row justify-content-between align-items-center mt-5">
                    <div className="col-8 mt-5">
                        <h1 className="text-dark ">Shopping Cart</h1>
                    </div>
                    <div className="col-4 mt-5">
                        <button onClick={handleClearCart} className="btn btn-danger">Clear Cart</button>
                    </div>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart.length > 0 ? (
                                currentCart.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        increaseQuantity={() => increaseQuantity(item.id)} // Pass the itemId as an argument
                                         decreaseQuantity={() => decreaseQuantity(item.id)} // Pass the itemId as an argument
                                        removeItemFromCart={removeItemFromCart}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="fs-2 text-danger text-center">
                                        Cart is Empty
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {isLastPage && cart && cart.cart_items && cart.cart_items.length !== 0 && (
                    <div className="container total mt-4">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-4 fs-2 text-danger">Total</div>
                            <div className="col-md-4 fs-2 text-danger">${totalPrice.toFixed(2)}</div>
                            <div className="col-md-4">
                                <Link to="/checkout">
                                    <button className="btn btn-danger w-100">Payment</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-center mt-4">
                    <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </>
    );
}
