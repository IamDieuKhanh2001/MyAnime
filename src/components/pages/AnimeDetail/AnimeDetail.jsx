import React, { useEffect, useState } from 'react';
import "./AnimeDetail.scss";
import Header from "./../../global/Header/Header";
import Footer from "./../../global/Footer/Footer";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import { useParams, useNavigate } from 'react-router-dom';
import { APIGetAllSeriesProductById, APIGetProductById } from "../../../api/axios/productAPI";
import ProductDetail from '../../global/Product/ProductDetail/ProductDetail';
import { productsActions } from '../../../api/redux/slices/productSlice';
import { useDispatch, useSelector } from "react-redux";
import ProductDetailSideBar from '../../global/Product/ProductDetailSideBar/ProductDetailSideBar';
import LoadingSkeletionProductDetail from '../../global/LoadingSkeletonProductAnimation/LoadingSkeletionProductDetail';

export default function AnimeDetail() {
  const { seriesId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const loadProductById = async () => {
    setLoading(true);
    console.log("Calling api get product");
    const resGetProduct = await APIGetProductById(seriesId);
    setProduct(resGetProduct.data)
    setLoading(false);
  };

  useEffect(() => {
    loadProductById();
  }, [seriesId]);

  return (
    <div className="animeDetail">
      <Header />
      <BreadcrumbOption cateList={product.categoryList} seriesName={product.seriesName} />
      <div className="anime-details">
        <div className="container">
          {loading ? (
            <LoadingSkeletionProductDetail />
          ) : (<React.Fragment>
            <ProductDetail data={product} />
            <div className="row">
              <div className="col-lg-8 col-md-8">
                {/* <AnimeReview /> */} 
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
