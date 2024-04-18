// import { useDispatch } from 'react-redux';
// import { removeCartItem, updateCartItemQuantity } from '../../store/cartSlice';

// export default function CartItem(props) {
//     const dispatch = useDispatch();

//     const removeItemFromCart = () => {
//         dispatch(removeCartItem(props.item));
//     };

//     const decreaseQuantity = () => {
//         if (props.quantity > 1) {
//             dispatch(updateCartItemQuantity({ item: props.item, quantity: props.quantity - 1 }));
//         }
//     };

//     const increaseQuantity = () => {
//         dispatch(updateCartItemQuantity({ item: props.item, quantity: props.quantity + 1 }));
//     };
// CartItem.js
// CartItem.js
// CartItem component
import React from 'react';

const CartItem = ({ item, decreaseQuantity, increaseQuantity, removeItemFromCart }) => {
    if (!item || !item.product || !item.product.price) {
        // If item or item.product or item.product.price is undefined or null, return null or render an error message
        return null; // or return some placeholder UI
    }

    return (
        <tr>
            <td>
                {/* Display product image */}
                <img src={item.product.image} alt="" className="img-fluid" style={{ maxHeight: "100px" }} />
            </td>
            <td>{item.product.description}</td>
            <td>
                {/* Display quantity */}
                <div className="btn-group" role="group">
                    <button className="btn btn-danger" onClick={() => decreaseQuantity(item.id)}><i className="fas fa-minus"></i></button>
                    <button className="btn btn-light">{item.quantity}</button>
                    <button className="btn btn-success" onClick={() => increaseQuantity(item.id)}><i className="fas fa-plus"></i></button>
                </div>
            </td>
            <td>
                {/* Remove item button */}
                <img className=" w-50 " style={{ cursor: "pointer" }} onClick={() => removeItemFromCart(item.id)}  src= 'https://f.nooncdn.com/s/app/com/noon/icons/trash.svg' />
            </td>
            <td>${item.product.price}</td> {/* Display price */}
        </tr>
    );
}

export default CartItem;







    // return (
    //     <tr>
    //         <td>
    //             <img src={props.item.thumbnail} alt="" className="img-fluid" style={{ maxHeight: "100px" }} />
    //         </td>
    //         <td>{props.item.description}</td>
    //         <td>
    //             <div className="btn-group" role="group">
    //                 <button className="btn btn-danger" onClick={decreaseQuantity}><i className="fas fa-minus"></i></button>
    //                 <button className="btn btn-light">{props.quantity}</button>
    //                 <button className="btn btn-success" onClick={increaseQuantity}><i className="fas fa-plus"></i></button>
    //             </div>
    //         </td>
    //         <td>
          
    //            <img className=" w-50 " style={{ cursor: "pointer" }} onClick={removeItemFromCart}  src= 'https://f.nooncdn.com/s/app/com/noon/icons/trash.svg' />
    //         </td>
    //         <td>${props.item.price}</td>
    //     </tr>
    // );




