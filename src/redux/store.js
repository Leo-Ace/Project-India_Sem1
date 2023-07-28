import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from './reducers/carts';
import wishlistReducer from './reducers/wishlist';

const store = configureStore({
  reducer: {
    carts: cartsReducer,
    wishlist: wishlistReducer
  }
});

export default store;