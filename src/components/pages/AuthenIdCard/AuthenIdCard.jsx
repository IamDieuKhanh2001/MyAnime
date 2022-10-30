import React from "react";
import Footer from "../../global/Footer/Footer";
import Header from "../../global/Header/Header";
import NormalBreadcrumb from "../../global/NormalBreadcrumb/NormalBreadcrumb";
import "./AuthenIdCard.scss";
import VerifyForm from "./VerifyForm/VerifyForm";

export default function AuthenIdCard() {
    return (
        <div className="authenIdCard">
            <Header />
            <NormalBreadcrumb
                title={"Age Verification"}
                description={
                    "Let us know your age to give you the best experience"
                }
            />
            <VerifyForm />
            <Footer />
        </div>
    );
}
