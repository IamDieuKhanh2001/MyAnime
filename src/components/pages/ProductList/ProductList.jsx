import React, { useEffect } from "react";
import "./ProductList.scss";
import BreadcrumbOption from "../../global/BreadcrumbOption/BreadcrumbOption";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";
import ProductPageable from "../../global/Product/ProductPageable/ProductPageable";
import { APIGetProducts, APIGetTotalProduct } from "../../../api/axios/productAPI";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductList() {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([])
  const [isLastPage, setIsLastPage] = useState(false);
  const [error, setError] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    console.log("Calling api get product");
    const resGetProduct = await APIGetProducts(currentPage)
      .then(res => {
        if (res.data.length === 0) {
          setIsLastPage(true)
        } else {
          setProducts((curProducts) => [...curProducts, ...res.data]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      })
  };

  useEffect(() => {
    loadProduct();
  }, [currentPage]);

  return (
    <div className="productList">
      <Header />
      <BreadcrumbOption />
      <ProductPageable
        productTitle={t("product_pageable.title")}
        setCurrentPage={setCurrentPage}
        loading={loading}
        error={error}
        isLastPage={isLastPage}
        products={products} />
      <Footer />
    </div>
  );
}
