import React from 'react'

function PremiumCard({ enable, remainTime }) {
    return (
        <React.Fragment>
            {enable && (
                <div div className="premium__card pb-3" >
                    <div className="premium__card__title d-flex justify-content-around">
                        <img src="./img/icon-premium.svg" alt="true" />
                        <h4>Premium member remain: 500 hours</h4>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default PremiumCard
