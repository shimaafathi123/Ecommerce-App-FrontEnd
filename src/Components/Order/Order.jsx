// import  { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setOrder, cancelOrderState } from "../../store/orderSlice";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import interceptorInstance from "../../axios/axios";
// import Navbar from "../Navbar/Navbar";
// //import Footer from "../Footer/Footer";

// function Order() {
//   const orders = useSelector((state) => state.orders.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     interceptorInstance
//       .get("orders/")
//       .then((response) => {
//         console.log(response.data);
//         dispatch(setOrder(response.data));
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   const cancelOrder = (id) => {
//     interceptorInstance
//       .post(`orders/${id}/cancel`)
//       .then((response) => {
//         console.log(response.data);
//         dispatch(cancelOrderState(id));
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-10 p-4 bg-light">
//         <div className="shadow justify-content-center px-2 py-3">
//           <div className="d-flex justify-content-between border-bottom pb-8 px-5">
//             <h1 className="font-weight-bold text-2xl">My Orders</h1>
//             <h2 className="font-weight-bold text-2xl text-uppercase">
//               {orders.length}
//               {orders.length > 1 ? " Orders" : " Order"}
//             </h2>
//           </div>
//           {orders.length ? (
//             <>
//               {orders.map((order, index) => (
//                 <div
//                   key={order.id}
//                   className="shadow justify-content-center px-4 py-5 my-5"
//                 >
//                   <div className="text-primary text-lg pt-4 pb-6 text-center m-auto">
//                     <strong>
//                       <h1>Order {index + 1}</h1>
//                     </strong>

//                     <Button
//                       variant={order.status === "canceled" ? "secondary" : "danger"}
//                       disabled={order.status === "canceled"}
//                       className="mt-4"
//                       onClick={() => cancelOrder(order.id)}
//                     >
//                       {order.status === "canceled"
//                         ? "Canceled"
//                         : "Cancel Order"}
//                     </Button>
//                   </div>
//                   <div className="d-none d-lg-block">
//                     <table className="w-full">
//                       <thead className="text-lg py-5 mb-4">
//                         <tr>
//                           <th className="pt-4 text-center col-span-5">
//                             Product
//                           </th>
//                           <th className="pt-4 text-center col-span-3">
//                             Quantity
//                           </th>
//                           <th className="pt-4 text-center col-span-2">Price</th>
//                           <th className="pt-4 text-center col-span-2">
//                             Total Price
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="py-6">
//                         {order.order_items.map((item) => (
//                           <tr key={item.id} className="my-10 text-center py-5">
//                             <td className="col-span-4 py-3 my-2">
//                               <div className="d-flex flex-column justify-content-around text-center">
//                                 <span className="text-xl">
//                                   {item.product.name}
//                                 </span>
//                                 <span className="text-danger text-sm">
//                                   fashmart
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="col-span-3 py-3 my-2">
//                               <span className="text-center w-1/5 text-lg">
//                                 {item.quantity}
//                               </span>
//                             </td>
//                             <td className="col-span-2 py-3 my-2">
//                               <span className="text-center w-1/5 text-lg">
//                                 ${item.product.price}
//                               </span>
//                             </td>
//                             <td className="col-span-2 py-3 my-2">
//                               <span className="text-center w-1/5 text-lg">
//                                 ${item.product.price * item.quantity}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>

//                       <tfoot className="text-lg py-5 mb-5">
//                         <tr>
//                           <th className="pt-4 text-center col-span-5">
//                             <strong>Date</strong>
//                           </th>
//                           <th className="pt-4 text-center col-span-3">
//                             <strong>Status</strong>
//                           </th>
//                           <th className="pt-4 text-center col-span-2">
//                             <strong>Total Price</strong>
//                           </th>
//                         </tr>
//                         <tr>
//                           <th className="pt-4 text-center col-span-5">
//                             <strong>{order.created_at.split("T")[0]}</strong>
//                           </th>
//                           <th className="pt-4 text-center col-span-3">
//                             <strong>
//                               <span
//                                 className={`${
//                                   order.status === "pending"
//                                     ? "text-warning"
//                                     : order.status === "shipped"
//                                     ? "text-primary"
//                                     : order.status === "delivered"
//                                     ? "text-success"
//                                     : "text-danger"
//                                 } px-2 py-1 rounded`}
//                               >
//                                 {order.status}
//                               </span>
//                             </strong>
//                           </th>
//                           <th className="pt-4 text-center col-span-2">
//                             <strong>${order.total_price}</strong>
//                           </th>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="bg-white items-center p-10 ">
//               <p className="text-center text-xl">No Orders Yet..</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div>
//         <Link
//           to="/"
//           className="d-flex font-weight-bold text-gray-600 text-lg my-10 pl-10"
//         >
//           <i className="fa-solid fa-arrow-left text-gray-600 text-l pr-1 text-lg"></i>
//           Continue Shopping
//         </Link>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default Order;
