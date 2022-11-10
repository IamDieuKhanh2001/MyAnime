import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  topViewInDay: [],
  topViewInWeek: [],
  topViewInMonth: [],
  topViewInYear: [],
  favoriteList: [],
  recentlyList: [],
  seriesCommentRecentList: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
    updateRecentlyList: (state, actions) => {
      state.recentlyList = actions.payload;
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
    updateTopViewInYear: (state, actions) => {
      state.topViewInYear = actions.payload;
    },
    updateFavoriteList: (state, actions) => {
      state.favoriteList = actions.payload;
    },
    updateSeriesCommentRecentList: (state, actions) => {
      state.seriesCommentRecentList = actions.payload;
    },
  },
});

const { reducer, actions } = products;
export const productsActions = actions;
export default reducer;
