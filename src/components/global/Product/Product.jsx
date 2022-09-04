import React, { useEffect } from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSection from "./ProductSection/ProductSection";
import { APIGetProducts } from "./../../../api/axios/productAPI";
import { productsActions } from "./../../../api/redux/slices/productSlice";
import ProductSideBar from "./ProductSideBar/ProductSideBar";

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="products">
      <div className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="popular__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Popular Shows</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="#" className="primary-btn">
                        View All
                        <span
                          onClick={() => navigate("/series-list")}
                          className="arrow_right"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {product.map((data, index) => (
                    <ProductSection data={data} key={index} />
                  ))}
                </div>
              </div>
              <div className="recent__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Recently Added Shows</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="" className="primary-btn">
                        View All
                        <span
                          onClick={() => navigate("/series-list")}
                          className="arrow_right"
                        />
                      </a>
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
                      <h4>Live Action</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="" className="primary-btn">
                        View All
                        <span
                          onClick={() => navigate("/series-list")}
                          className="arrow_right"
                        />
                      </a>
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
