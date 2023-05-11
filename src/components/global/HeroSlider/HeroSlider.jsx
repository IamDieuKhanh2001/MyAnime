import React from "react";
import "./HeroSlider.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function HeroSlider() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = {
        loop: true,
        margin: 10,
        items: 1,
        autoplay: true,
    };

    return (
        // <!-- Hero Section Begin -->
        <div className="hero">
            <div className="container">
                <OwlCarousel
                    className="owl-theme hero__slider owl-carousel"
                    {...options}
                >
                    <div
                        className="hero__items set-bg"
                        style={{
                            backgroundImage: 'url("/img/hero/fate-stay-night.jpg")',
                        }}
                    >
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="hero__text">
                                    <div className="label">Action</div>
                                    <h2>Fate stay night: Unlimited Blade Works</h2>
                                    <p>
                                        Every human inhabiting the world of Alcia ...
                                    </p>
                                    <a onClick={() => navigate("/details/166")}>
                                        <span>Watch Now</span>{" "}
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hero__items set-bg"
                        style={{
                            backgroundImage: 'url("/img/hero/demon-slayer-season-3.jpg")',
                        }}
                    >
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="hero__text">
                                    <div className="label">Adventure</div>
                                    <h2>Kimetsu no yaiba session 3</h2>
                                    <p>
                                        Cuộc hành trình của Tanjiro đã dẫn cậu đến Làng Thợ rèn, nơi cậu gặp lại hai Trụ Cột, thành viên của ...
                                    </p>
                                    <a onClick={() => navigate("/details/237")}>
                                        <span>Watch Now</span>{" "}
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hero__items set-bg"
                        style={{
                            backgroundImage: 'url("/img/hero/conan.jpg")',
                        }}
                    >
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="hero__text">
                                    <div className="label">Detective</div>
                                    <h2>
                                        Detective Conan: Halloween Bride 2022
                                    </h2>
                                    <p>
                                        During the wedding of Takagi and Sato,
                                        an assailant breaks and tries to attack
                                        Sato...
                                    </p>
                                    <a onClick={() => navigate("/details/8")}>
                                        <span>Watch Now</span>{" "}
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    );
}
