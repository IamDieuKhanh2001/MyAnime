import React from "react";
import "./Category.scss";
import BreadcrumbOption from "./../../global/BreadcrumbOption/BreadcrumbOption";
import Product from "../../global/Product/Product";
import Header from "../../global/Header/Header";
import Footer from "../../global/Footer/Footer";

export default function Category() {
  return (
    <div className="category">
      <Header />
      <BreadcrumbOption />
      <Product />
      <Footer />
    </div>
  );
}
