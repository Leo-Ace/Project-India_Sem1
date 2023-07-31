import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const cartsReducer = createSlice({
  name: 'carts',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    deletePrdInCarts: (state, action) => {
      const result = state.filter(item => item.id !== action.payload);
      return result;
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