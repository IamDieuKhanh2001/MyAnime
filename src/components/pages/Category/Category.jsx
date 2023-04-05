import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { APIGetCategoryByCategoryId } from '../../../api/axios/categoryAPI'
import { APIGetProductsByCategoryId, APIGetTotalProductByCategoryId } from '../../../api/axios/productAPI'
import BreadcrumbOption from '../../global/BreadcrumbOption/BreadcrumbOption'
import Footer from '../../global/Footer/Footer'
import Header from '../../global/Header/Header'
import ProductPageable from '../../global/Product/ProductPageable/ProductPageable'
import { useScroll } from 'react-scroll-hooks'

export default function Category() {
  const { categoryId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])
  const [isLastPage, setIsLastPage] = useState(false);
  const [error, setError] = useState(false);
  const { scrollToY } = useScroll({scrollSpeed: 50}); 

  const loadProductByCategoryId = async () => {
    setLoading(true);
    console.log("Calling api get product by category");
    const resGetProduct = await APIGetProductsByCategoryId(categoryId, currentPage)
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

  const loadCategoryById = async () => {
    console.log("Calling api get category");
    const resGetCategory = await APIGetCategoryByCategoryId(categoryId);
    setCategory(resGetCategory.data)
  }

  useEffect(() => {
    loadCategoryById()
    loadProductByCategoryId();
  }, [currentPage]);

  return (
    <div className='category'>
      <Header />
      <BreadcrumbOption cateList={[]} />
      <ProductPageable
        productTitle={category.name}
        setCurrentPage={setCurrentPage}
        loading={loading}
        error={error}
        isLastPage={isLastPage}
        products={products} />
      <Footer />
    </div>
  )
}
