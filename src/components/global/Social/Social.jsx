import React from "react";
import { Messenger } from "./Messenger/Messenger";
import { Zalo } from "./Zalo/Zalo";

export const Social = () => {
  return (
    <div className="social">
      <Zalo />
      <Messenger />
    </div>
  );
};
