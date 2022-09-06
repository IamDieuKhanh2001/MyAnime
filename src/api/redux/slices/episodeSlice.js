import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const episodes = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    updateList: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

const { reducer, actions } = episodes;
export const episodeActions = actions;
export default reducer;