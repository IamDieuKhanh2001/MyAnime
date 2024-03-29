import React from 'react'
import { Alert, Stack, Typography } from "@mui/material";
import HistoryItemDropdown from "./HistoryItemDropdown/HistoryItemDropdown";
import { useNavigate } from 'react-router-dom';

function HistoryDropdown({ historyToday, historyEarlier }) {
    const navigate = useNavigate();

    const login = window.sessionStorage.getItem("jwt");

    return (
        <ul className="history-dropdown">
            {login !== null ? (
                <React.Fragment>
                    {historyToday.length !== 0 &&
                        (
                            <React.Fragment>
                                <Typography component="div" variant="h6">
                                    Today
                                </Typography>
                                {historyToday.slice(0, 2).map((history, index) => (
                                    <li key={index}>
                                        <HistoryItemDropdown data={history} />
                                    </li>
                                ))}
                            </React.Fragment>
                        )
                    }
                    {historyEarlier.length !== 0 &&
                        (<React.Fragment>
                            <Typography component="div" variant="h6">
                                Earlier
                            </Typography>
                            {historyEarlier.slice(0, 2).map((history, index) => (
                                <li key={index}>
                                    <HistoryItemDropdown data={history} />
                                </li>
                            ))}
                        </React.Fragment>)
                    }
                    <a onClick={() => navigate(`/history`)}>View all</a>
                </React.Fragment>
            ) : (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">Please login to use this feature!</Alert>
                </Stack>
            )}
        </ul>
    )
}

export default HistoryDropdown
