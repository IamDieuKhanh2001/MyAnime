import React, { useEffect, useState } from 'react';
import "./AnimeDetail.scss";
import Header from "./../../global/Header/Header";
import Footer from "./../../global/Footer/Footer";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import { useParams, useNavigate } from 'react-router-dom';
import { APIGetAllSeriesProductById, APIGetProductById } from "../../../api/axios/productAPI";
import ProductDetail from '../../global/Product/ProductDetail/ProductDetail';
import { APIGetCategoryOfSeriesById } from '../../../api/axios/categoryAPI';
import { productsActions } from '../../../api/redux/slices/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { categorySeriesActions } from '../../../api/redux/slices/categorySeriesSlice';
import AnimeReview from '../../global/AnimeReview/AnimeReview';
import ProductDetailSideBar from '../../global/Product/ProductDetailSideBar/ProductDetailSideBar';
import LoadingAnimation from '../../global/LoadingAnimation/LoadingAnimation';

export default function AnimeDetail() {
  const dispatch = useDispatch();

  const { seriesId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  
  const loadProductById = async () => {
    setLoading(true);
    console.log("Calling api get product");
    const resGetProduct = await APIGetProductById(seriesId);
    setProduct(resGetProduct.data)
    console.log(resGetProduct)
    setLoading(false);
  };

  const loadAllSeriesProductBySeriesId = async () => {
    console.log("Calling api get product series");
    const resGetRelateSeries = await APIGetAllSeriesProductById(seriesId);
    if (resGetRelateSeries?.status === 200) {
      const updateListAction = productsActions.updateList(resGetRelateSeries.data);
      dispatch(updateListAction);
    }  
  };

  const loadCategoryOfSeriesBySeriesId = (movieId) => {
    console.log("Calling api get cat");
    const resGetCat = APIGetCategoryOfSeriesById(movieId);
  };


  useEffect(() => {
    loadProductById();
    loadAllSeriesProductBySeriesId();
    // loadCategoryOfSeriesBySeriesId(product.movieId);
    // console.log(series.Object)
    // const resGetProduct = APIGetProductById(seriesId);
    // setProduct(resGetProduct.data)

  }, []);
  return (
    <div className="animeDetail">
      <Header />
      <BreadcrumbOption />
      <div className="anime-details spad">
        <div className="container">
          {loading ? (
            <LoadingAnimation />
          ) : (<React.Fragment>
            <ProductDetail data={product} />

            <div className="row">
            <div className="col-lg-8 col-md-8">
              <AnimeReview />
            </div>
            <div className="col-lg-4 col-md-4">
              <ProductDetailSideBar />
            </div>
          </div>
          </React.Fragment>)}
        </div>
      </div>

      <Footer />
    </div>
  );
}
