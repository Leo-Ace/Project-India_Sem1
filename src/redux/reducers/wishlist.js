import { createSlice } from "@reduxjs/toolkit";

const wishlistReducer = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    setWishlist: (state, action) => {
      return action.payload;
    },
    deletePrdInWishlist: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateWishlist: (state, action) => {
      state.push(action.payload);
    }
  }
});

const { actions, reducer } = wishlistReducer;
export const { setWishlist, deletePrdInWishlist, updateWishlist } = actions;
export default reducer;