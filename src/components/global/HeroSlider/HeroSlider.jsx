import React from "react";
import "./HeroSlider.scss";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { APIGetProducts } from "../../../api/axios/productAPI";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productsActions } from "../../../api/redux/slices/productSlice";

export default function HeroSlider() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = {
        loop: true,
        margin: 10,
        items: 1,
        autoplay: true,
    };

    // const product = useSelector((state) => state.products.list);

    // const loadProduct = async () => {
    //   console.log("Calling api get product");
    //   const resGetProduct = await APIGetProducts();
    //   if (resGetProduct?.status === 200) {
    //     const updateListAction = productsActions.updateList(resGetProduct.data);
    //     dispatch(updateListAction);
    //   }
    // };

    // useEffect(() => {
    //   loadProduct();
    // }, []);

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
                                    <a onClick={() => navigate("/watching")}>
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
                            backgroundImage: 'url("/img/hero/faf.jpg")',
                        }}
                    >
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="hero__text">
                                    <div className="label">Adventure</div>
                                    <h2>Fast &amp; Furious 9</h2>
                                    <p>
                                        The film tells the story of Dominic
                                        Toretto who lives a quiet life with his
                                        family...
                                    </p>
                                    <a onClick={() => navigate("/watching")}>
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
                                    <a onClick={() => navigate("/watching")}>
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
