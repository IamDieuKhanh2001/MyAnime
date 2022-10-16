import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/slices/productSlice";
import totalProductReducer from "../redux/slices/totalProductSlice"
import categorySeriesReducer from "../redux/slices/categorySeriesSlice"
import episodesReducer from "../redux/slices/episodeSlice"
import commentsReducer from "../redux/slices/commentSlice"
import historyReducer from "../redux/slices/HistoryWatchingSlice"
import userReducer from "../redux/slices/userSlice"
import adminReducer from "../redux/slices/adminSlice"
import { localStorageGetReduxState, localStorageSaveReduxState } from "../../utils/storage";

const rootReducer = {
  products: productReducer,
  totalProduct: totalProductReducer,
  categorySeries: categorySeriesReducer,
  episodes: episodesReducer,
  comments: commentsReducer,
  histories: historyReducer,
  users: userReducer,
  admin:adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
   preloadedState: localStorageGetReduxState()
});
store.subscribe(() => {
  localStorageSaveReduxState(store.getState())
})

export default store
