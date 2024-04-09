import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
  loading: true,
  error: null,
  amount: 0,
  totalAmount: 0, 
  totalPrice: 0, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.cart = action.payload;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeItemSuccess(state, action) {
      state.cart = action.payload;
    },

    // add other reducers for updating the cart
  },
});

export const { fetchCartStart, fetchCartSuccess, fetchCartFailure, removeItemSuccess } = cartSlice.actions;
export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
