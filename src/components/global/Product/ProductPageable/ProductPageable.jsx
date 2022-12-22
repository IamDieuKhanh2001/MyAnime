import React from 'react'
import "./ProductPageable.scss";
import ProductSideBar from '../ProductSideBar/ProductSideBar'
import ProductSection from "../ProductSection/ProductSection";
import { useTranslation } from 'react-i18next';
import LoadingSkeletonProductAnimation from '../../LoadingSkeletonProductAnimation/LoadingSkeletonProductAnimation';

function ProductPageable({
  productTitle,
  totalProduct,
  currentPage,
  setCurrentPage,
  loading,
  products }) {
  const { t } = useTranslation();

  // useEffect(() => {
  //   loadTotalProduct();
  //   loadProduct();
  // }, [currentPage]);

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
              {loading ?
                (
                  <LoadingSkeletonProductAnimation numberOfItem={9} />
                ) : (

                  <div className='row'>
                    {products.map((data, index) => (
                      <ProductSection data={data} key={index} />
                    ))}
                  </div>
                )}
            </div>
            <div className="product__pagination">
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
