import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';


const CartItem = ({ item, decreaseQuantity, increaseQuantity, removeItemFromCart }) => {
    return (
      <tr>
        <td><img src={item.product.image} alt={item.product.name} style={{ width: '50px', height: '50px' }} /></td>
        <td>{item.product.description}</td>
        <td>
          <button onClick={() => decreaseQuantity(item.id, item.product.id)} disabled={item.quantity === 1} type="button" className="btn btn-outline-secondary btn-sm">
            <i className="fa-solid fa-minus text-danger"></i>
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button onClick={() => increaseQuantity(item.id, item.product.id)} type="button" className="btn btn-outline-secondary btn-sm">
  <i className="fa-solid fa-plus text-success"></i>
</button>

        </td>
        <td>
          <button onClick={() => removeItemFromCart(item.id)} type="button" className="btn btn-danger btn-sm">
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
        <td>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
      </tr>
    );
  };
  

export default CartItem;
