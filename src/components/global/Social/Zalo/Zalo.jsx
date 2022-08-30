import React from "react";
import { Helmet } from "react-helmet";
import "./Zalo.scss";

export const Zalo = () => {
  return (
    <div className="zalo">
      <div
        className="zalo-chat-widget"
        data-oaid="579745863508352884"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="0"
        data-width="300"
        data-height="300"
      ></div>
      <Helmet>
        <script src="https://sp.zalo.me/plugins/sdk.js"></script>
      </Helmet>
    </div>
  );
};
