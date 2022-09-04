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
import AnimeReview from '../../global/AnimeReview/AnimeReview';

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
    const resGetCat = await APIGetCategoryOfSeriesById(7);
    console.log(resGetCat.data)
  };

  useEffect(() => {
    loadProductById();
    // const resGetProduct = APIGetProductById(seriesId);
    // setProduct(resGetProduct.data)
    // loadCategoryOfSeriesBySeriesId();
  }, []);

  console.log(product)

  return (
    <div className="animeDetail">
      <Header />
      <BreadcrumbOption />
      <div className="anime-details spad">
        <div className="container">
          <ProductDetail data={product} />
          <div className="row">
            <div className="col-lg-8 col-md-8">
            <AnimeReview />
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
