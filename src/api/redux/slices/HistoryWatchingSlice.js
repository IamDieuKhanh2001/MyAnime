import { createSlice } from "@reduxjs/toolkit";
import { some } from "lodash";

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
      clearUserHistory: () => initialState,
    },
  });
  
  const { reducer, actions } = histories;
  export const HistoryActions = actions;
  export default reducer;