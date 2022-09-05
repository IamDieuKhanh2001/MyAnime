import React from 'react'
import "./LoadingAnimation.scss"

function LoadingAnimation() {
    return (
        <React.Fragment>
            <div className='loading-animation col-12'>
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif" alt={true} />
            </div>
        </React.Fragment>
    )
}

export default LoadingAnimation
