import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    // wishlist : wishlistReducer,
    // orders: orderReducer,
    // Add other reducers if needed
  },
});
