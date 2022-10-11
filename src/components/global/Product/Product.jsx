import React, { useEffect, useState } from "react";
import "./Product.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSection from "./ProductSection/ProductSection";
import { APIGetProducts } from "./../../../api/axios/productAPI";
import { productsActions } from "./../../../api/redux/slices/productSlice";
import ProductSideBar from "./ProductSideBar/ProductSideBar";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useTranslation } from "react-i18next";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)

  const product = useSelector((state) => state.products.list);

  const loadProduct = async () => {
    console.log("Calling api get product");
    setLoading(true)
    const resGetProduct = await APIGetProducts(1);
    if (resGetProduct?.status === 200) {
      const updateListAction = productsActions.updateList(resGetProduct.data);
      dispatch(updateListAction);
    }
    setLoading(false)
  };

  useEffect(() => {
    loadProduct();

  }, []);

  return (
    <div className="products">
      <div className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="popular__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>{t('home.section_popular_show_title')}</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <Link to="/series-list">
                        <a className="primary-btn text-white">
                          {t('home.btn_all_text')}
                          <span
                            className="arrow_right"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {loading ?
                    (<LoadingAnimation />) : (
                      <React.Fragment>
                        {product.map((data, index) => (
                          <ProductSection data={data} key={index} />
                        ))}
                      </React.Fragment>)}
                </div>
              </div>
              <div className="recent__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>{t('home.section_recently_added_show_title')}</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <Link to="/series-list">
                        <a className="primary-btn text-white">
                          {t('home.btn_all_text')}
                          <span
                            className="arrow_right"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {product.map((data, index) => (
                    <ProductSection data={data} key={index} />
                  ))}
                </div>
              </div>
              <div className="live__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>{t('home.section_live_action_title')}</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <Link to="/series-list">
                        <a className="primary-btn text-white">
                          {t('home.btn_all_text')}
                          <span
                            className="arrow_right"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {product.map((data, index) => (
                    <ProductSection data={data} key={index} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <ProductSideBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
