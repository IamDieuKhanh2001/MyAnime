import React, { useEffect } from "react";
import "./ProductList.scss";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import ProductPageable from "../../global/Product/ProductPageable/ProductPageable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { APIGetProducts, APIGetTotalProduct } from "../../../api/axios/productAPI";
import { productsActions } from "../../../api/redux/slices/productSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);

  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const loadProduct = async () => {
    setLoading(true);
    console.log("Calling api get product");
    const resGetProduct = await APIGetProducts(currentPage);
    // setProducts(resGetProduct.data)
    if (resGetProduct?.status === 200) {
      const updateListAction = productsActions.updateList(resGetProduct.data);
      dispatch(updateListAction);
    }
    setLoading(false);
  };

  const loadTotalProduct = async () => {
    console.log("Calling api get total product");
    const resGetTotalProduct = await APIGetTotalProduct();
    setTotalProduct(resGetTotalProduct.data.totalSeries);
  };


  useEffect(() => {
    loadTotalProduct();
    loadProduct();
  }, [currentPage]);

  return (
    <div className="productList">
      <Header />
      <BreadcrumbOption />
      <ProductPageable
        productTitle={t("product_pageable.title")}
        totalProduct={totalProduct}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        products={products} />
      <Footer />
    </div>
  );
}
