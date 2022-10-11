import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  topViewInDay: [],
  topViewInWeek: [],
  topViewInMonth: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
    updateTopViewInDay: (state, actions) => {
      state.topViewInDay = actions.payload;
    },
    updateTopViewInWeek: (state, actions) => {
      state.topViewInWeek = actions.payload;
    },
    updateTopViewInMonth: (state, actions) => {
      state.topViewInMonth = actions.payload;
    },
  },
});

const { reducer, actions } = products;
export const productsActions = actions;
export default reducer;
