import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const categorySeries = createSlice({
  name: "categorySeries",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

const { reducer, actions } = categorySeries;
export const categorySeriesActions = actions;
export default reducer;