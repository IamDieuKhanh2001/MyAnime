import React, { useEffect } from "react";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSection from "./ProductSection/ProductSection";
import { APIGetProducts } from './../../../api/axios/productAPI';
import { productsActions } from './../../../api/redux/slices/productSlice';

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
                        View All{" "}
                        <span
                          onClick={() => navigate("/category")}
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
                        View All{" "}
                        <span
                          onClick={() => navigate("/category")}
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
                        View All{" "}
                        <span
                          onClick={() => navigate("/category")}
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
                    <div
                      onClick={() => navigate("/details")}
                      className="product__sidebar__view__item set-bg mix week years"
                      style={{ backgroundImage: "url('img/sidebar/tv-3.jpg')" }}
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="">
                          Sword art online alicization war of underworld
                        </a>
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate("/details")}
                      className="product__sidebar__view__item set-bg mix years month"
                      style={{ backgroundImage: "url('img/sidebar/tv-4.jpg')" }}
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="">
                          Fate/stay night: Heaven's Feel I. presage flower
                        </a>
                      </h5>
                    </div>
                    <div
                      onClick={() => navigate("/details")}
                      className="product__sidebar__view__item set-bg mix day"
                      style={{ backgroundImage: "url('img/sidebar/tv-5.jpg')" }}
                    >
                      <div className="ep">18 / ?</div>
                      <div className="view">
                        <i className="fa fa-eye" /> 9141
                      </div>
                      <h5>
                        <a href="">Fate stay night unlimited blade works</a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
