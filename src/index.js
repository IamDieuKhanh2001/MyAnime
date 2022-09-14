import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/global.scss";
import "./style/_responsive.scss";
import { Provider } from "react-redux";
import store from "./api/redux/store";
import en from 'javascript-time-ago/locale/en.json'
import vi from 'javascript-time-ago/locale/ru.json'
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(vi)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
