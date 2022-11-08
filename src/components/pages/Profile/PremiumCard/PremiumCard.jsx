import React from 'react'
import "./PremiumCard.scss"

function PremiumCard({ enable, remainTime }) {
    return (
        <React.Fragment>
            {enable && (
                <div div className="premium__card pb-3 d-flex" >
                    <div className="premium__card__enable__title d-flex px-3">
                        <h4>Premium member: </h4>
                        <h4><span className="badge badge-success ml-2">Active</span></h4>
                        <span className='text-secondary ml-2 mt-1'>{remainTime} Hours left</span>
                        <a href='/subscription/history' className='text-dark ml-2 mt-1'>See detail</a>
                    </div>
                </div>
            )}
            {!enable && (
                <div div className="premium__card pb-3 d-flex" >
                    <div className="premium__card__disable__title d-flex px-3">
                        <h4>Premium member: </h4>
                        <h4><span className="badge badge-secondary ml-2">Unactive</span></h4>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default PremiumCard
