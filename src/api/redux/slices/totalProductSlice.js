import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
};

const totalProduct = createSlice({
  name: "totalProduct",
  initialState,
  reducers: {
    updateTotalProduct: (state, actions) => {
      state.total = actions.payload;
    },
  },
});

const { reducer, actions } = totalProduct;
export const totalProductsActions = actions;
export default reducer;