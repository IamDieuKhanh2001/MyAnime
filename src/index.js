import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/global.scss";
import "./style/_responsive.scss";
import { Provider } from "react-redux";
import store from "./api/redux/store";

import { ConfirmProvider } from 'material-ui-confirm';

import en from 'javascript-time-ago/locale/en.json'
import vi from 'javascript-time-ago/locale/ru.json'
import TimeAgo from "javascript-time-ago";

import 'flag-icon-css/css/flag-icons.min.css'

//i18n lib change lang
import i18n from "i18next"
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'jp', 'vn'],
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'navigator', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

//lib react time ago
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(vi)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </Provider>
);
