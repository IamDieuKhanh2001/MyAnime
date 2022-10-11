import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APIGetTopMovieSeriesViewInNumberOfDay } from "../../../../api/axios/productAPI";
import { productsActions } from "../../../../api/redux/slices/productSlice";
import ProductSideBarItem from "./ProductSideBarItem";

export default function ProductSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)

  const topProductViewInDay = useSelector((state) => state.products.topViewInDay);

  const loadTopViewProduct = async () => {
    console.log("Calling api get top view");
    setLoading(true)
    const resGetTopViewInDay = await APIGetTopMovieSeriesViewInNumberOfDay(1, 5);
    console.log(resGetTopViewInDay)
    if (resGetTopViewInDay?.status === 200) {
      const updateTopViewInDayAction = productsActions.updateTopViewInDay(resGetTopViewInDay.data);
      dispatch(updateTopViewInDayAction);
    }
    setLoading(false)
  };

  useEffect(() => {
    loadTopViewProduct();

  }, []);

  return (
    <div className="product__sidebar">
      <div className="product__sidebar__view">
        <div className="section-title">
          <h5>Top Views</h5>
        </div>
        <ul className="filter__controls">
          <li className="active" data-filter=".day">
            Day
          </li>
          <li data-filter=".week">Week</li>
          <li data-filter=".month">Month</li>
          <li data-filter=".years">Years</li>
          <li data-filter="*">
            All
          </li>
        </ul>
        <div className="filter__gallery">
          {/* {topProductViewInDay.map((productInDay, index) => (
            <ProductSideBarItem data={productInDay} key={index} />
          ))} */}
          <ProductSideBarItem data={{
            image: "https://res.cloudinary.com/dpxgtmzld/image/upload/v1662211584/MyAnimeProject_TLCN/movie_series/3.jpg",
            name: "Test item 1"
          }}/>
          <ProductSideBarItem />
          <ProductSideBarItem />
          <ProductSideBarItem />

          {/* <div className="product__sidebar__view__item set-bg mix day years" data-setbg="img/sidebar/tv-1.jpg">
            <div className="ep">18 / ?</div>
            <div className="view"><i className="fa fa-eye" /> 9141</div>
            <h5><a href="#">Boruto: Naruto next generations</a></h5>
          </div>
          <div className="product__sidebar__view__item set-bg mix month week" data-setbg="img/sidebar/tv-2.jpg">
            <div className="ep">18 / ?</div>
            <div className="view"><i className="fa fa-eye" /> 9141</div>
            <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
          </div>
          <div className="product__sidebar__view__item set-bg mix week years" data-setbg="img/sidebar/tv-3.jpg">
            <div className="ep">18 / ?</div>
            <div className="view"><i className="fa fa-eye" /> 9141</div>
            <h5><a href="#">Sword art online alicization war of underworld</a></h5>
          </div>
          <div className="product__sidebar__view__item set-bg mix years month" data-setbg="img/sidebar/tv-4.jpg">
            <div className="ep">18 / ?</div>
            <div className="view"><i className="fa fa-eye" /> 9141</div>
            <h5><a href="#">Fate/stay night: Heaven's Feel I. presage flower</a></h5>
          </div>
          <div className="product__sidebar__view__item set-bg mix day" data-setbg="img/sidebar/tv-5.jpg">
            <div className="ep">18 / ?</div>
            <div className="view"><i className="fa fa-eye" /> 9141</div>
            <h5><a href="#">Fate stay night unlimited blade works</a></h5>
          </div> */}
        </div>

      </div>
      <div className="product__sidebar__comment">
        <div className="section-title">
          <h5>Top 10 most view</h5>
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
  );
}
