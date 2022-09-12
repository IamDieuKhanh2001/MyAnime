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
      // updateHistoryItem: (state, actions) => {
      //   console.log(actions.payload.id);
      //   // let epHistoryCurrent = state.list.find(history => history.episode_id === parseFloat(actions.payload.id))
      //   for (let history of state.list) {
      //     console.log(history)
      //   }
      // },
    },
  });
  
  const { reducer, actions } = histories;
  export const HistoryActions = actions;
  export default reducer;