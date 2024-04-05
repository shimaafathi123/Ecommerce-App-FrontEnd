
function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <div>
      <p>{item.product.name}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default CartItem;

