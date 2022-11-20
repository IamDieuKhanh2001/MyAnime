import React, { useEffect, useState } from "react";
import "./PaymentPackageModal.scss";

import PaymentPackageDialog from "./PaymentPackageDialog/PaymentPackageDialog";
import { useNavigate } from "react-router-dom";

export default function PaymentPackageModal() {
    const [open, setOpen] = useState(false);
    const username = window.sessionStorage.getItem("username");
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleLoginNavigate = () => {
        navigate(`/login`)
    };

    return (
        <React.Fragment>
            <button className="btn btn-warning open__premium__modal" onClick={
                username !== null ? (handleClickOpen) : (handleLoginNavigate)
            }>
                Join the Premium
            </button>
            <PaymentPackageDialog open={open} setOpen={setOpen} />
        </React.Fragment>
    );
}
