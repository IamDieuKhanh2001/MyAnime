import React from 'react'
import "./LoadingAnimation.scss"

function LoadingAnimation() {
    return (
        <React.Fragment>
            <div className='loading-animation col-12'>
                <img src="/img/loading-animation/animation-1.gif" alt={true} />
            </div>
        </React.Fragment>
    )
}

export default LoadingAnimation
