import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../cart/CartItem';
import { Link } from 'react-router-dom';
import PaginationComponent from '../pagination/pagination';
import CustomNavbar from "../Navbar/Navbar"

export default function UserCart() {
    const { cart } = useSelector((state) => state.cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCart = cart.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cart.length / itemsPerPage);
    const isLastPage = currentPage === totalPages;

    return (
      <>
      <CustomNavbar/>
      <br></br>
      <br></br>
      <br></br>
        <div className="container">

            <h1 className="mt-5 text-dark text-center">Shopping Cart</h1>
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
            <div className="d-flex justify-content-center">
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            {isLastPage && cart.length !== 0 && (
                <div className="container total m-4">
                    <div className="row">
                        <div className="col fs-2 text-success">Total</div>
                        <div className="col fs-2 text-success">${totalPrice}</div>
                        <Link to="/checkout">
                            <button className="border-2 w-25 btn btn-success">Payment</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
