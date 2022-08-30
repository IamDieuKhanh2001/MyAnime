import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

const { reducer, actions } = products;
export const productsActions = actions;
export default reducer;
