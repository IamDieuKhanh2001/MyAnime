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
    addExtraToListComments: (state, action) => {
      const newComments = action.payload.filter((comment) => { //Remove duplicated item
        return !state.list.find((existingComment) => existingComment.id === comment.id);
      });
      state.list = state.list.concat(newComments);
    },
    addFirstListComments: (state, action) => {
      //Add item to first index
      const newComments = [action.payload, ...state.list];
      state.list = newComments;
  },
  },
});

const { reducer, actions } = comments;
export const commentActions = actions;
export default reducer;