import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Link, useNavigate } from "react-router-dom";
import "./Test.scss";


export default function Test() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const avatar = window.sessionStorage.getItem("avatar");
    const username = window.sessionStorage.getItem("username");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

    }, []);
    return (
        <React.Fragment>
            <button className="btn btn-warning open__premium__modal" onClick={handleClickOpen}>
                Open
            </button>
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
                        <button className="payment__dialog-cancel">Cancel</button>
                        <button className="payment__dialog-success">subscribed</button>
                    </div>
                </div>

            </Dialog>
        </React.Fragment>
    );
}
