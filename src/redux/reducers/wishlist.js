import { createSlice } from "@reduxjs/toolkit";

const wishlistReducer = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    setWishlist: (state, action) => {
      return action.payload;
    },
    deletePrdInWishlist: (state, action) => {
      const result = state.filter(item => item.id !== action.payload);
      return result;
    },
    updateWishlist: (state, action) => {
      state.push(action.payload);
    }
  }
});

const { actions, reducer } = wishlistReducer;
export const { setWishlist, deletePrdInWishlist, updateWishlist } = actions;
export default reducer;