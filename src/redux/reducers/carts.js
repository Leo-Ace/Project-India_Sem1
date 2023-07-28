import { createSlice } from "@reduxjs/toolkit";

const cartsReducer = createSlice({
  name: 'carts',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    deletePrdInCarts: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateCart: (state, action) => {
      return action.payload;
    },
    createCart: (state, action) => {
      state.push(action.payload);
    }
  }
});

const { actions, reducer } = cartsReducer;
export const { setCart, deletePrdInCarts, updateCart, createCart } = actions;
export default reducer;