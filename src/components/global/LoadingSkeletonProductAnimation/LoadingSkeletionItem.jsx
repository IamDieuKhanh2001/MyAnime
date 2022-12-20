import React from 'react'

function LoadingSkeletionItem() {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item loading-skeleton">
                <div
                    className="product__item__pic set-bg loading-skeleton-img"
                    style={{
                        backgroundImage: `url("/img/recent/recent-1.jpg")`,
                    }}
                >
                    <div className="ep">9999 / 9999</div>
                    <div className="premium">
                        <img className="premium__icon" src="/img/icon-premium.svg" alt="true" />
                        Premium placeholder
                    </div>

                    <div className="comment">
                        <i className="fa fa-comments" /> 9999
                    </div>
                    <div className="view">
                        <i className="fa fa-eye" /> 9999
                    </div>
                </div>
                <div className="product__item__text">
                    <ul>
                        <li>category placeholder</li>
                    </ul>
                    <h5>
                        <a href="#">Name placeholder</a>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default LoadingSkeletionItem