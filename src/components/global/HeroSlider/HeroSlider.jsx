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
              backgroundImage: 'url("/img/hero/hero-1.jpg")',
            }}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="hero__text">
                  <div className="label">Adventure</div>
                  <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                  <p>After 30 days of travel across the world...</p>
                  <a onClick={() => navigate("/watching")}>
                    <span>Watch Now</span> <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hero__items set-bg"
            style={{
              backgroundImage: 'url("/img/hero/hero-2.jpg")',
            }}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="hero__text">
                  <div className="label">Adventure</div>
                  <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                  <p>After 30 days of travel across the world...</p>
                  <a onClick={() => navigate("/watching")}>
                    <span>Watch Now</span> <i className="fa fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hero__items set-bg"
            style={{
              backgroundImage: 'url("/img/hero/hero-3.jpg")',
            }}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="hero__text">
                  <div className="label">Adventure</div>
                  <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                  <p>After 30 days of travel across the world...</p>
                  <a onClick={() => navigate("/watching")}>
                    <span>Watch Now</span> <i className="fa fa-angle-right" />
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
