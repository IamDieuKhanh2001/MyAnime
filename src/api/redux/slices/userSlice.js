import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  fullName: null,
  email: null,
  avatar: null,
  createAt: null,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserInfo: (state, actions) => {
      state.username = actions.payload.username;
      state.email = actions.payload.email;
      state.fullName = actions.payload.fullName;
      state.avatar = actions.payload.avatar;
      state.createAt = actions.payload.createAt
    },
    resetUserInfo: () => initialState,
  },
});

const { reducer, actions } = users;
export const userActions = actions;
export default reducer;