// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import interceptorInstance from "../../axios/axios";
// import { Button } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { setWishlist } from "../../store/wishlistSlice";
// import { setCart } from "../../store/cartSlice";
// import Navbar from "../Navbar/Navbar";
// import { ToastContainer, toast } from "react-toastify";
// //import Footer from "../Footer/Footer"; 

// function WishList() {
//   const wishlist = useSelector((state) => state.wishlist.wishlist);
//   const cart = useSelector((state) => state.cart.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     interceptorInstance
//       .get("users/wishlist")
//       .then((response) => {
//         console.log(response);
//         dispatch(setWishlist(response.data[0].favs));
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   const removeItem = (item) => {
//     interceptorInstance
//       .delete(`users/wishlist/items/${item.product.id}`)
//       .then((response) => {
//         console.log(response)
//         dispatch(
//           setWishlist(
//             wishlist.filter((wishlist_item) => wishlist_item.id !== item.id)
//           )
//         );
//       })
//       .catch((error) => console.log(error));
//     console.log(wishlist);
//   };

//   const addToCartHandler = (item) => {
//     const existed = cart.findIndex(
//       (cartItem) => cartItem.product.id === item.product.id
//     );
//     if (existed === -1) {
//       interceptorInstance
//         .post(`users/cart/items/${item.product.id}/add`, { quantity: 1 })
//         .then((response) => dispatch(setCart([...cart, response.data])))
//         .catch((error) => {
//           console.error(error);
//           if (error.response && error.response.status >= 400) {
//             toast.error(error.response.data.error[0] || "Wrong Credintials", {
//               position: "top-center",
//             });
//           } else if (error.request) {
//             console.log(error.request);
//           } else {
//             console.log("Error", error.message);
//           }
//           console.log(error.config);
//         });
//     } else {
//       navigate("/cart");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <ToastContainer />
//       <div className="container mx-auto mt-10">
//         <div className="card md:shadow-md justify-center px-2 "> 
//           <div className="d-flex justify-content-between border-bottom pb-8 px-5 "> 
//             <h1 className="font-weight-bold text-2xl">Wish List</h1> 
//             <h2 className="font-weight-bold text-2xl text-uppercase">{wishlist.length} {wishlist.length > 1 ? "Items" : "Item"}</h2> 
//           </div>
//           {wishlist.length ? (
//             <>
//               <div className="d-none lg:block"> 
//                 <table className="w-11/12">
//                   <tbody className="py-6">
//                     {wishlist.map((item) => (
//                       <tr key={item.id} className="my-10 text-center py-5">
//                         <td className="d-flex align-items-center"> 
//                           <div className="p-5">
//                             <img className="h-40" src={item.product.image} alt={item.product.name} />
//                           </div>
//                           <div className="d-flex flex-column justify-content-between flex-grow"> 
//                             <span className="font-weight-bold text-lg">{item.product.name}</span>
//                             <span className="text-danger text-m">fashmart</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex flex-column justify-content-between ml-4">
//                             {cart.find((selected_item) => selected_item.product.id === item.product.id) ? (
//                               <Button variant="success" className="shadow-sm bg-success text-white mx-2 my-2 md:my-1 w-2/3" onClick={() => navigate("/cart")}>
//                                 See purchase options &nbsp; &nbsp; <i className="fa-solid fa-cart-plus text-white mx-2 my-2 md:my-1"></i>
//                               </Button>
//                             ) : (
//                               <Button variant="success" className="shadow-sm bg-success text-white mx-2 my-2 md:my-1" onClick={() => addToCartHandler(item)}>
//                                 Add to Cart &nbsp; &nbsp; <i className="fa-solid fa-cart-plus text-white"></i>
//                               </Button>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex flex-column justify-content-between ml-4">
//                             <Button variant="danger" className="bg-danger text-white" onClick={() => removeItem(item)}>
//                               Remove &nbsp; &nbsp; <i className="fa-solid fa-x text-white"></i>
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="grid grid-cols-1 gap-4 d-md-none mx-auto"> 
//                 {wishlist.map((item) => (
//                   <div className="bg-white shadow-md rounded-lg hover:bg-gray-200 border-gray-400 my-2" key={`${item.id}+${item.product.id}`}>
//                     <div className="d-flex xs:flex-column md:flex-row justify-content-start py-10 text-lg"> 
//                       <img className="h-40" src={item.product.image} alt={item.product.name} />
//                       <div className="d-flex flex-column items-center space-y-5 mx-auto"> 
//                         <span className="font-weight-bold">{item.product.name}</span> 
//                         <span className="text-danger">fashmart</span> 
//                         <div className="d-flex flex-column md:flex-row">
//                           {cart.find((selected_item) => selected_item.product.id === item.product.id) ? (
//                             <Button variant="success" className="shadow-sm bg-success text-white mx-2 my-2 md:my-1" onClick={() => navigate("/cart")}>
//                               See purchase options &nbsp; &nbsp; <i className="fa-solid fa-cart-plus text-white"></i>
//                             </Button>
//                           ) : (
//                             <Button variant="success" className="shadow-sm bg-success text-white mx-2 my-2 md:my-1" onClick={() => addToCartHandler(item)}>
//                               Add to Cart &nbsp; &nbsp; <i className="fa-solid fa-cart-plus text-white"></i>
//                             </Button>
//                           )}
//                           <Button variant="danger" className="bg-danger text-white" onClick={() => removeItem(item)}>
//                             Remove &nbsp; &nbsp; <i className="fa-solid fa-x text-white"></i>
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="bg-white items-center p-10"> 
//               <p className="text-center text-xl">No Thing In your wish List</p> 
//             </div>
//           )}
//         </div>
//         <div>
//           <Link to="/" className="d-flex font-weight-bold text-indigo-600 text-lg mt-10"> 
//             <i className="fa-solid fa-arrow-left text-indigo-600 text-l pr-1 text-lg"></i>
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//       {/* <Footer />  */}
//     </>
//   );
// }
// export default WishList;
