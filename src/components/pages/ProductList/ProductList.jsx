import React , {useEffect} from "react";
import "./ProductList.scss";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import ProductPageable from "../../global/Product/ProductPageable/ProductPageable";
import { useDispatch, useSelector } from "react-redux";
import { APIGetProducts, APIGetTotalProduct } from "../../../api/axios/productAPI";
import { totalProductsActions } from "../../../api/redux/slices/totalProductSlice";
import { productsActions } from "../../../api/redux/slices/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="category">
      <Header />
      <BreadcrumbOption />
      <ProductPageable productTitle="All series"/>
      <Footer />
    </div>
  );
}
