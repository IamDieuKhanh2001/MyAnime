import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slices/productSlice";
import totalProductReducer from "../redux/slices/totalProductSlice"
import categorySeriesReducer from "../redux/slices/categorySeriesSlice"
import episodesReducer from "../redux/slices/episodeSlice"
import commentsReducer from "../redux/slices/commentSlice"
import historyReducer from "../redux/slices/HistoryWatchingSlice"
import userReducer from "../redux/slices/userSlice"

const rootReducer = {
  products: productReducer,
  totalProduct: totalProductReducer,
  categorySeries: categorySeriesReducer,
  episodes: episodesReducer,
  comments: commentsReducer,
  histories: historyReducer,
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
