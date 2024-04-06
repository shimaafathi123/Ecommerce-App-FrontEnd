import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartStart, removeItemSuccess } from '../../store/cartSlice';
import CartItem from './CartItem';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const loading = useSelector(state => state.cart.loading);
  const error = useSelector(state => state.cart.error);

  useEffect(() => {
    dispatch(fetchCartStart());
  }, [dispatch]);

  const handleRemoveItem = productId => {
    // Dispatch action to remove item from cart
    dispatch(removeItemSuccess(/* pass the updated cart after removing item */));
  };

  // add other handler functions

  return (
    <div>
      <h2>Shopping Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : cart ? (
        <div>
          {cart.cart_items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => handleRemoveItem(item.product.id)}
              // Pass other props and handlers to CartItem
            />
          ))}
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
