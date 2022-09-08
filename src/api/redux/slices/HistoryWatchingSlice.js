import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
  };
  
  const histories = createSlice({
    name: "histories",
    initialState,
    reducers: {
      updateList: (state, actions) => {
        state.list = actions.payload;
      },
    },
  });
  
  const { reducer, actions } = histories;
  export const HistoryActions = actions;
  export default reducer;