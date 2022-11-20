import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import "./SourceErrorPlaceholder.scss";

function SourceErrorPlaceholder() {
    return (
        <React.Fragment>
            <div className="errorServer col-12">
                <img className="img404" src="/img/404.png" alt="true" />
                <Alert severity="warning">
                    <AlertTitle>
                        <strong>Something when wrong ...</strong>
                    </AlertTitle>
                    Can not find resources, Try change another server !!
                </Alert>
            </div>
        </React.Fragment>
    );
}

export default SourceErrorPlaceholder;
