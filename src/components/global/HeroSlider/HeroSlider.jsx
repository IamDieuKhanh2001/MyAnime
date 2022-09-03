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

  const product = useSelector((state) => state.products.list);

  const loadProduct = async () => {
    console.log("Calling api get product");
    const resGetProduct = await APIGetProducts();
    if (resGetProduct?.status === 200) {
      const updateListAction = productsActions.updateList(resGetProduct.data);
      dispatch(updateListAction);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="hero">
      <div className="container">
        {product.length > 0 && (
          <OwlCarousel
            className="owl-theme hero__slider owl-carousel"
            {...options}
          >
            <div
              className="hero__items set-bg"
              style={{
                backgroundImage: `url("./img/hero/hero-1.jpg")`,
              }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>{product[0].title}</h2>
                    <p>{product[0].description}</p>
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
                backgroundImage: `url("./img/hero/hero-1.jpg")`,
              }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>{product[1].title}</h2>
                    <p>{product[1].description}</p>
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
                backgroundImage: `url("./img/hero/hero-1.jpg")`,
              }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>{product[2].title}</h2>
                    <p>{product[2].description}</p>
                    <a onClick={() => navigate("/watching")}>
                      <span>Watch Now</span> <i className="fa fa-angle-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        )}
      </div>
    </div>
  );
}
