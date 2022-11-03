import React from 'react'
import { useEffect } from 'react'

function ServerNameSection({ serverOption, setServerOption}) {
    const handleChangeServer = (serverName) => {        
        setServerOption(serverName)
    }

    return (
        <React.Fragment>
            <div className="section-title">
                <h5>
                    Server
                </h5>
            </div>
            <a className={serverOption === "DO" ? "episode__active" : ""} onClick={() => handleChangeServer("DO")}>
                DO
            </a>
            <a className={serverOption === "CD" ? "episode__active" : ""} onClick={() => handleChangeServer("CD")}>
                CD
            </a>
        </React.Fragment>
    )
}

export default ServerNameSection
