import React, { useState, useEffect } from 'react';
import CustomNavbar from '../Navbar/Navbar';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = (cartId) => {
    fetch(`http://127.0.0.1:8000/cart/cart/${cartId}/`) // Assuming your Django endpoint for fetching cart data is '/api/cart/'
      .then(response => response.json())
      .then(data => {
        setCartItems(data.cart);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  };

  const removeFromCart = (itemId) => {
    fetch(`/api/delete-cart-item/${itemId}/`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchCartData();
        } else {
          console.error('Failed to delete item from cart');
        }
      })
      .catch(error => console.error('Error deleting item from cart:', error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateTotalPrice = () => {
    // Assuming each item has a 'price' property
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    // Assuming 10% tax
    const taxes = totalPrice * 0.1;
    return totalPrice + taxes;
  };

  return (
    <>
    <CustomNavbar/>
    <div className="container mt-5 ">
    <div className="d-flex justify-content-between align-items-center mt-5">
      <h2 className='text-center mt-5 text-danger fw-bolder'>Shopping Cart</h2>
      </div>
      {cartItems.length === 0 ? (
        <p className='text-center mt-5 fs-2'>Your cart is empty</p>
      ) : (
        <div>
          <ul className="list-group">
            {currentItems.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.product}</span>
                <span>${item.price}</span>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <nav>
            <ul className="pagination">
              {Array(Math.ceil(cartItems.length / itemsPerPage)).fill().map((_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ShoppingCart;

// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CartItem from './CartItem';
// import { clearCart } from '../../store/cartSlice';
// import { Link } from 'react-router-dom';
// import PaginationComponent from '../pagination/pagination';
// import CustomNavbar from '../Navbar/Navbar';

// export default function UserCart() {
//     // Retrieve cart state from Redux store
//     const { cart } = useSelector((state) => state.cart);

//     // Initialize state variables
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (cart) {
//             let total = 0;
//             cart.forEach((item) => {
//                 total += item.itemData.price * item.quantity;
//             });
//             setTotalPrice(total);
//         }
//     }, [cart]);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };
//     const handleClearCart = () => {
//         dispatch(clearCart()); 
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentCart = cart.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(cart.length / itemsPerPage);
//     const isLastPage = currentPage === totalPages;

//     return (
//         <>
//         <CustomNavbar/>
//         <div className="container m-5">
            
//             <div className="d-flex justify-content-between align-items-center mt-5">
//                 <h1 className="mt-5 text-dark">Shopping Cart</h1>
//                 <button onClick={handleClearCart} className="btn btn-danger mt-5">Clear Cart</button> {/* Clear Cart button */}
//             </div>
//             <table className="table mt-4">
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th>Description</th>
//                         <th>Quantity</th>
//                         <th>Actions</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentCart.length > 0 ? (
//                         currentCart.map((item, index) => (
//                             <CartItem key={index} item={item.itemData} quantity={item.quantity} />
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="fs-2 text-danger text-center">
//                                 Cart is Empty
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
            
//             {isLastPage && cart.length !== 0 && (
//                 <div className="container total m-4 ">
//                     <div className="row">
//                         <div className="col fs-2 text-success">Total</div>
//                         <div className="col fs-2 text-success">${totalPrice}</div>
//                         <Link to="/checkout">
//                             <button className="border-2 w-25 btn btn-success">Payment</button>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//             <div className="d-flex justify-content-center ms-5">
//                 <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//             </div>
//         </div>
//         </>
//     );
// }

