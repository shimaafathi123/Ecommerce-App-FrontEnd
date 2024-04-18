import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: [] },
    reducers: {
        addCartItem: (state, action) => {
            const { id } = action.payload;
            const found = state.cart.find((item) => item.itemData.id === id);
            if (found) {
                found.quantity += 1;
            } else {
                state.cart.push({
                    itemData: action.payload,
                    quantity: 1
                });
            }
        },
        removeCartItem: (state, action) => {
            const { id } = action.payload;
            state.cart = state.cart.filter(item => item.itemData.id !== id);
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const found = state.cart.find(cartItem => cartItem.itemData.id === id);
            if (found) {
                found.quantity = quantity;
            } else {
                console.error(`Item with ID ${id} not found in the cart.`);
            }
        },
        clearCart: (state) => {
            state.cart = [];
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart_items;
        },
    },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
