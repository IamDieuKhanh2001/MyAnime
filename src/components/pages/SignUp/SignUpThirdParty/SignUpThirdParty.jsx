import React from "react";
import "./SignUpThirdParty.scss";

export default function SignUpThirdParty() {
  return (
    <div className="signUpThirdParty">
      <a href="/" className="btn btn-primary facebook">
        Facebook <i className="fa fa-facebook mt-1"></i>
      </a>
      <a href="/" className="btn btn-primary google">
        Google <i className="fa fa-google-plus mt-1"></i>
      </a>
    </div>
  );
}
