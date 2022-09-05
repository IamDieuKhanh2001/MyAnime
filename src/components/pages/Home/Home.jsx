import { Layout } from "../../global/Layout/Layout";
import React, { useEffect } from "react";
import "./Home.scss";
import HeroSlider from "../../global/HeroSlider/HeroSlider";
import Product from "../../global/Product/Product";

export const Home = () => {
  console.log(window.sessionStorage.getItem("jwt"))

  useEffect(() => {
    document.title = "Trang chủ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <Layout>
        <HeroSlider />
        <Product />
      </Layout>
    </div>
  );
};
