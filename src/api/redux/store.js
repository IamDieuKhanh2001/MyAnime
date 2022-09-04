import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slices/productSlice";
import totalProductReducer from "../redux/slices/totalProductSlice"
const rootReducer = {
  products: productReducer,
  totalProduct: totalProductReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
