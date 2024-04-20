import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: { id: null, cart_items: [] } ,}, // Initialize cart with id and cart_items as an empty array
    
    reducers: {
        addCartItem: (state, action) => {
            const { id } = action.payload;
            const foundItem = state.cart.cart_items.find((item) => item.id === id);
            if (foundItem) {
                state.cart.cart_items = state.cart.cart_items.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                state.cart.cart_items.push({ ...action.payload, quantity: 1 });
            }
        },
       removeCartItem: (state, action) => {
    const { id } = action.payload;
    state.cart.cart_items = state.cart.cart_items.filter(item => item.id !== id);
},

updateCartItemQuantity: (state, action) => {
    const { id, action: updateAction } = action.payload;
    const updatedCartItems = state.cart.cart_items.map(item => {
        if (item.id === id) {
            if (updateAction === "INCREMENT") {
                return { ...item, quantity: item.quantity + 1 };
            } else if (updateAction === "DECREMENT" && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
        }
        return item;
    });
    state.cart.cart_items = updatedCartItems;
},
  
        clearCart: (state) => {
            state.cart.cart_items = [];
        },
        setCart: (state, action) => {
            state.cart.cart_items = Array.isArray(action.payload.cart_items) ? action.payload.cart_items : [];
            state.cart.id = action.payload.id;
        },
    },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
