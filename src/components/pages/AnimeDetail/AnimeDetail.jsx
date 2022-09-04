import React, { useEffect, useState } from 'react';
import "./AnimeDetail.scss";
import Header from "./../../global/Header/Header";
import Footer from "./../../global/Footer/Footer";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import { useParams, useNavigate } from 'react-router-dom';
import { APIGetProductById } from "../../../api/axios/productAPI";
import ProductDetail from '../../global/Product/ProductDetail/ProductDetail';
import { APIGetCategoryOfSeriesById } from '../../../api/axios/categoryAPI';
import { productsActions } from '../../../api/redux/slices/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { categorySeriesActions } from '../../../api/redux/slices/categorySeriesSlice';

export default function AnimeDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seriesId } = useParams();
  const [product, setProduct] = useState({});


  const loadProductById = async () => {
    console.log("Calling api get product");
    const resGetProduct = await APIGetProductById(seriesId);
    setProduct(resGetProduct.data)
  };

  const loadCategoryOfSeriesBySeriesId = async () => {
    console.log("Calling api get cat");
    const resGetCat = await APIGetCategoryOfSeriesById(product.movieId);
  };

  useEffect(() => {
    loadProductById();
    // loadCategoryOfSeriesBySeriesId();
  }, []);

  return (
    <div className="animeDetail">
      <Header />
      <BreadcrumbOption />
      <div className="anime-details spad">
        <div className="container">
          <ProductDetail data={product} />
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="anime__details__review">
                <div className="section-title">
                  <h5>Reviews</h5>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-1.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Chris Curry - <span>1 Hour ago</span>
                    </h6>
                    <p>
                      whachikan Just noticed that someone categorized this as
                      belonging to the genre "demons" LOL
                    </p>
                  </div>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-2.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Lewis Mann - <span>5 Hour ago</span>
                    </h6>
                    <p>Finally it came out ages ago</p>
                  </div>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-3.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Louis Tyler - <span>20 Hour ago</span>
                    </h6>
                    <p>Where is the episode 15 ? Slow update! Tch</p>
                  </div>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-4.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Chris Curry - <span>1 Hour ago</span>
                    </h6>
                    <p>
                      whachikan Just noticed that someone categorized this as
                      belonging to the genre "demons" LOL
                    </p>
                  </div>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-5.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Lewis Mann - <span>5 Hour ago</span>
                    </h6>
                    <p>Finally it came out ages ago</p>
                  </div>
                </div>
                <div className="anime__review__item">
                  <div className="anime__review__item__pic">
                    <img src="/img/anime/review-6.jpg" alt />
                  </div>
                  <div className="anime__review__item__text">
                    <h6>
                      Louis Tyler - <span>20 Hour ago</span>
                    </h6>
                    <p>Where is the episode 15 ? Slow update! Tch</p>
                  </div>
                </div>
              </div>
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form action="#">
                  <textarea placeholder="Your Comment" defaultValue={""} />
                  <button type="submit">
                    <i className="fa fa-location-arrow" /> Review
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="anime__details__sidebar">
                <div className="section-title">
                  <h5>you might like...</h5>
                </div>
                <div
                  onClick={() => navigate("/details")}
                  className="product__sidebar__view__item set-bg"
                  style={{
                    backgroundImage: "url('/img/sidebar/tv-1.jpg')",
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
                <div
                  onClick={() => navigate("/details")}
                  className="product__sidebar__view__item set-bg"
                  style={{
                    backgroundImage: "url('/img/sidebar/tv-2.jpg')",
                  }}
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
                  className="product__sidebar__view__item set-bg"
                  style={{
                    backgroundImage: "url('/img/sidebar/tv-3.jpg')",
                  }}
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
                  className="product__sidebar__view__item set-bg"
                  style={{
                    backgroundImage: "url('/img/sidebar/tv-4.jpg')",
                  }}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
