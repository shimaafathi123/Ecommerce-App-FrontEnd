import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import PaginationComponent from '../pagination/pagination';
import CustomNavbar from '../Navbar/Navbar';

export default function UserCart() {
    // Retrieve cart state from Redux store
    const { cart } = useSelector((state) => state.cart);

    // Initialize state variables
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const dispatch = useDispatch();

    useEffect(() => {
        if (cart) {
            let total = 0;
            cart.forEach((item) => {
                total += item.itemData.price * item.quantity;
            });
            setTotalPrice(total);
        }
    }, [cart]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleClearCart = () => {
        dispatch(clearCart()); 
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCart = cart.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cart.length / itemsPerPage);
    const isLastPage = currentPage === totalPages;

    return (
        <>
        <CustomNavbar/>
        <div className="container m-5">
            
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h1 className="mt-5 text-dark">Shopping Cart</h1>
                <button onClick={handleClearCart} className="btn btn-danger mt-5">Clear Cart</button> {/* Clear Cart button */}
            </div>
            <table className="table mt-4">
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
                        currentCart.map((item, index) => (
                            <CartItem key={index} item={item.itemData} quantity={item.quantity} />
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
            
            {isLastPage && cart.length !== 0 && (
                <div className="container total m-4 ">
                    <div className="row">
                        <div className="col fs-2 text-success">Total</div>
                        <div className="col fs-2 text-success">${totalPrice}</div>
                        <Link to="/checkout">
                            <button className="border-2 w-25 btn btn-success">Payment</button>
                        </Link>
                    </div>
                </div>
            )}
            <div className="d-flex justify-content-center ms-5">
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
        </>
    );
}

