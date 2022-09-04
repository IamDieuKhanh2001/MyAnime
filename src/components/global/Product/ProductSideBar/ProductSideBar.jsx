import React from 'react'
import { useNavigate } from "react-router-dom";

export default function ProductSideBar() {
    const navigate = useNavigate();

    return (
        <div className="product__sidebar">
            <div className="product__sidebar__view">
                <div className="section-title">
                    <h5>Top Views</h5>
                </div>
                <ul className="filter__controls">
                    <li className="active" data-filter="*">
                        Day
                    </li>
                    <li data-filter=".week">Week</li>
                    <li data-filter=".month">Month</li>
                    <li data-filter=".years">Years</li>
                </ul>
                <div className="filter__gallery">
                    <div
                        onClick={() => navigate("/details")}
                        className="product__sidebar__view__item set-bg mix day years"
                        style={{ backgroundImage: "url('img/sidebar/tv-1.jpg')" }}
                    >
                        <div className="ep">18 / ?</div>
                        <div className="view">
                            <i className="fa fa-eye" /> 9141
                        </div>
                        <h5>
                            <a href="">Boruto: Naruto next generations</a>
                        </h5>
                    </div>
                    <div
                        onClick={() => navigate("/details")}
                        className="product__sidebar__view__item set-bg mix month week"
                        style={{ backgroundImage: "url('img/sidebar/tv-1.jpg')" }}
                    >
                        <div className="ep">18 / ?</div>
                        <div className="view">
                            <i className="fa fa-eye" /> 9141
                        </div>
                        <h5>
                            <a href="">The Seven Deadly Sins: Wrath of the Gods</a>
                        </h5>
                    </div>

                </div>
            </div>
            <div className="product__sidebar__comment">
                <div className="section-title">
                    <h5>New Comment</h5>
                </div>
                <div
                    onClick={() => navigate("/details")}
                    className="product__sidebar__comment__item"
                >
                    <div className="product__sidebar__comment__item__pic">
                        <img src="img/sidebar/comment-1.jpg" alt />
                    </div>
                    <div className="product__sidebar__comment__item__text">
                        <ul>
                            <li>Active</li>
                            <li>Movie</li>
                        </ul>
                        <h5>
                            <a href="">The Seven Deadly Sins: Wrath of the Gods</a>
                        </h5>
                        <span>
                            <i className="fa fa-eye" /> 19.141 Viewes
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => navigate("/details")}
                    className="product__sidebar__comment__item"
                >
                    <div className="product__sidebar__comment__item__pic">
                        <img src="img/sidebar/comment-2.jpg" alt />
                    </div>
                    <div className="product__sidebar__comment__item__text">
                        <ul>
                            <li>Active</li>
                            <li>Movie</li>
                        </ul>
                        <h5>
                            <a href="#">Shirogane Tamashii hen Kouhan sen</a>
                        </h5>
                        <span>
                            <i className="fa fa-eye" /> 19.141 Viewes
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => navigate("/details")}
                    className="product__sidebar__comment__item"
                >
                    <div className="product__sidebar__comment__item__pic">
                        <img src="img/sidebar/comment-3.jpg" alt />
                    </div>
                    <div className="product__sidebar__comment__item__text">
                        <ul>
                            <li>Active</li>
                            <li>Movie</li>
                        </ul>
                        <h5>
                            <a href="">Kizumonogatari III: Reiket su-hen</a>
                        </h5>
                        <span>
                            <i className="fa fa-eye" /> 19.141 Viewes
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => navigate("/details")}
                    className="product__sidebar__comment__item"
                >
                    <div className="product__sidebar__comment__item__pic">
                        <img src="img/sidebar/comment-4.jpg" alt />
                    </div>
                    <div className="product__sidebar__comment__item__text">
                        <ul>
                            <li>Active</li>
                            <li>Movie</li>
                        </ul>
                        <h5>
                            <a href="">Monogatari Series: Second Season</a>
                        </h5>
                        <span>
                            <i className="fa fa-eye" /> 19.141 Viewes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
