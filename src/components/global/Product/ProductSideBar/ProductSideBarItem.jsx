import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProductSideBarItem({itemSideBar}) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/details")}
            className="product__sidebar__view__item set-bg"
            style={{
                backgroundImage: `url("/img/sidebar/comment-2.jpg")`,
            }}
        >
            <div className="ep">18 / ?</div>
            <div className="view">
                <i className="fa fa-eye" /> 9141
            </div>
            <h5>
                <a href="">Boruto: Naruto next generations</a>
            </h5>
        </div>
    )
}

export default ProductSideBarItem
