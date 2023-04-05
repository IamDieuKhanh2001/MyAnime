import React, { useCallback, useRef, useState } from 'react'
import "./ProductPageable.scss";
import ProductSideBar from '../ProductSideBar/ProductSideBar'
import ProductSection from "../ProductSection/ProductSection";
import { useTranslation } from 'react-i18next';
import { useScroll } from "react-scroll-hooks";
import LoadingSkeletonProductAnimation from '../../LoadingSkeletonProductAnimation/LoadingSkeletonProductAnimation';
import { useEffect } from 'react';

function ProductPageable({
  productTitle,
  setCurrentPage,
  loading,
  error,
  isLastPage,
  products }) {
  const { t } = useTranslation();
  const observer = useRef();

  //Normal scroll

  // const renderedPagginationItem = [];
  // const renderProductPagination = () => {
  //   let totalPage = Math.ceil(totalProduct / 9);
  //   for (let i = 1; i <= totalPage; i++) {
  //     renderedPagginationItem.push(i);
  //   }
  // };

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // renderProductPagination();


  //infinite scroll product

  const lastItemRef = useCallback(
    (node) => {
      if (loading || isLastPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, isLastPage]
  );

  useEffect(() => {
  }, []);

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
                      <h4>
                        {productTitle}
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    {/* <div className="product__page__filter">
                      <p>Order by:</p>
                      <select>
                        <option value>A-Z</option>
                        <option value>1-10</option>
                        <option value>10-50</option>
                      </select>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className='row'>
                {products.map((data, index) => {
                  if (products.length === index + 1) {
                    return (<ProductSection data={data} key={index} lastItemRef={lastItemRef} />)
                  } else {
                    return (<ProductSection data={data} key={index} />)
                  }
                }
                )}
              </div>
              {loading && <LoadingSkeletonProductAnimation numberOfItem={3} />}
              {error &&
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Connection error!</strong>
                  <hr></hr>
                  Can not connect to server, check your connection and try again!!.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              }
            </div>
            {/* <div className="product__pagination">
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
            </div> */}
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
