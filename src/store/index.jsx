import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'
import wishlistReducer from'./wishlistSlice'
export default configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,

  },
});
