<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import "./ProductPageable.scss";
import ProductSideBar from '../ProductSideBar/ProductSideBar'
=======
import React, { useEffect, useState } from "react";
import ProductSideBar from "../ProductSideBar/ProductSideBar";
>>>>>>> c42e5077a5e99daaa3b775dcd3e1ddd06d7bef02
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  APIGetProducts,
  APIGetTotalProduct,
} from "../../../../api/axios/productAPI";
import ProductSection from "../ProductSection/ProductSection";
import { useSearchParams } from "react-router-dom";

function ProductPageable({ productTitle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const loadProduct = async () => {
    setLoading(true);
    console.log("Calling api get product");
<<<<<<< HEAD
    const resGetProduct = await APIGetProducts(currentPage);
    setProducts(resGetProduct.data)
    setLoading(false);
=======
    console.log(currentPage);
    const resGetProduct = await APIGetProducts(currentPage);
    setProducts(resGetProduct.data);
>>>>>>> c42e5077a5e99daaa3b775dcd3e1ddd06d7bef02
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

  const renderedPagginationItem = [];
  const renderProductPagination = () => {
    let totalPage = Math.ceil(totalProduct / 9);
    for (let i = 1; i <= totalPage; i++) {
      renderedPagginationItem.push(i);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  renderProductPagination();
  return (
    <section className="product-page spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="product__page__content">
              <div className="product__page__title">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-6">
                    <div className="section-title">
                      <h4>{productTitle}</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="product__page__filter">
                      <p>Order by:</p>
                      <select>
                        <option value>A-Z</option>
                        <option value>1-10</option>
                        <option value>10-50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {loading ?
                  (<div className='loading-animation col-12'>
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif" alt={true} />
                  </div>) : (
                    <React.Fragment>
                      {products.map((data, index) => (
                        <ProductSection data={data} key={index} />
                      ))}
                    </React.Fragment>)}
              </div>
            </div>
            <div className="product__pagination">
<<<<<<< HEAD
              {renderedPagginationItem.map((item) => item === currentPage ? (
                <a key={item} className="current-page" onClick={() => {
                  paginate(item)
                }}>{item}</a>
              ) : (
                <a key={item} onClick={() => {
                  paginate(item)
                }}>{item}</a>
              ))
              }
              <a onClick={() => {
                paginate(currentPage + 1)
              }}><i className="fa fa-angle-double-right" /></a>
=======
              {renderedPagginationItem.map((item) =>
                item === currentPage ? (
                  <a
                    key={item}
                    className="current-page"
                    onClick={() => {
                      paginate(item);
                    }}
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    onClick={() => {
                      paginate(item);
                    }}
                  >
                    {item}
                  </a>
                )
              )}
              <a
                onClick={() => {
                  paginate(currentPage + 1);
                }}
              >
                <i className="fa fa-angle-double-right" />
              </a>
>>>>>>> c42e5077a5e99daaa3b775dcd3e1ddd06d7bef02
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <ProductSideBar />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPageable;
