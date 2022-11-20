import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Link, useNavigate } from "react-router-dom";
import "./PaymentWaitingDialog.scss";


export default function PaymentWaitingDialog({open, setOpen}) {
    const navigate = useNavigate();

    const avatar = window.sessionStorage.getItem("avatar");
    const username = window.sessionStorage.getItem("username");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = () => {
        window.location.reload();
    };

    useEffect(() => {

    }, []);
    return (
        <React.Fragment>
            {/* <button className="btn btn-warning open__premium__modal" onClick={handleClickOpen}>
                Open
            </button> */}
            <Dialog open={open} onClose={handleClose} maxWidth='sm'>
                <div className="payment__dialog">
                    <div className="payment__dialog__header">
                        <span>Complete the payment on the page you are being redirected to.</span>
                    </div>
                    <div className="payment__dialog__body">
                        <p>
                            Do not close this window before the payment is complete. After you complete the payment, tap either of the following buttons as needed.
                        </p>

                    </div>
                    <div className="payment__dialog__footer">
                        <button className="payment__dialog-cancel" onClick={() => {setOpen(false)}}>Cancel</button>
                        <button className="payment__dialog-success" onClick={handleSuccess}>I've subscribed</button>
                    </div>
                </div>
                
            </Dialog>
        </React.Fragment>
    );
}
