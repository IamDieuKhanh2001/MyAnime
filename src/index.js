import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/global.scss";
import "./style/_responsive.scss";
import { Provider } from "react-redux";
import store from "./api/redux/store";
import { ConfirmProvider } from 'material-ui-confirm';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfirmProvider>
    <App />
    </ConfirmProvider>
    
  </Provider>
);
