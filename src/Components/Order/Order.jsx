import  { useState, useEffect } from 'react';

function Order() {
    const [orders, setOrders] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch(`http://localhost:8000/orders`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access}`,
                },
            });
            const data = await response.json();
            setOrders(data);
        }
        fetchOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8000/orders/${orderId}/cancel`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userInfo.access}`,
                },
            });
            if (response.ok) {
                // Update orders after successful cancellation
                const updatedOrders = orders.map(order => {
                    if (order.id === orderId) {
                        return { ...order, status: 'canceled' };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            } else {
                // Handle error response
                console.error('Failed to cancel order');
            }
        } catch (error) {
            console.error('Error occurred while cancelling order', error);
        }
    };

    return (
        <div className="justify-content-center mb-3 mt-4 bg-light m-auto rounded-3 w-75 align-content-center">
            <h2 className="text-dark mt-4 text-center fw-bold display-6">My Orders</h2>
            <hr />

            <table className="table table-bordered table-hover m-auto mb-5">
                <thead className="table-light">
                    <tr>
                        <th className="border-0 fw-bold">Transaction ID</th>
                        <th className="border-0 fw-bold">Status</th>
                        <th className="border-0 fw-bold">Total Price</th>
                        <th className="border-0 fw-bold">Delivery Date</th>
                        <th className="border-0 fw-bold">Actions</th> {/* Added Actions column */}
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="align-middle">{order.transaction_id}</td>

                            <td className="align-middle">
                                <span className={`badge badge-warning text-dark rounded-pill ${order.status === 'shipped' ? 'fw-bold display-6' : ''}`}>
                                    {order.status}
                                    {order.status === 'shipped' && <i className="fas fa-motorcycle ms-1"></i>}
                                    {order.status === 'delivered' && <i className="fas fa-user ms-1"></i>}
                                    {order.status === 'pending' && <i className="fas fa-box ms-1"></i>}
                                </span>
                            </td>

                            <td className="align-middle">
                                <span className="badge badge-warning text-dark rounded-pill">{order.total_price}</span>
                            </td>

                            <td className="align-middle">
                                <p className="text-muted mb-0">{order.delivered_date}</p>
                            </td>

                            <td className="align-middle">
                             {/* Display Cancel button only if order is not already cancelled */}
                             {order.status !== 'canceled' && (
                            <button className="btn btn-danger" onClick={() => cancelOrder(order.id)}>Cancel</button>
                                   )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;
