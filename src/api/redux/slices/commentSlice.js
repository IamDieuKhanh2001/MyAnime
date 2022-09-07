import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

const { reducer, actions } = comments;
export const commentActions = actions;
export default reducer;