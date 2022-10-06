import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { APIGetCategoryByCategoryId } from '../../../api/axios/categoryAPI'
import { APIGetProductsByCategoryId, APIGetTotalProductByCategoryId } from '../../../api/axios/productAPI'
import { productsActions } from '../../../api/redux/slices/productSlice'
import BreadcrumbOption from '../../global/BreadcrumbOption/BreadcrumbOption'
import Footer from '../../global/Footer/Footer'
import Header from '../../global/Header/Header'
import ProductPageable from '../../global/Product/ProductPageable/ProductPageable'

export default function Category() {

  const { categoryId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);

  const [totalProductByCategoryId, setTotalProductByCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({})

  const loadProductByCategoryId = async () => {
    setLoading(true);
    console.log("Calling api get product");
    const resGetProduct = await APIGetProductsByCategoryId(categoryId, currentPage);
    // setProducts(resGetProduct.data)
    if (resGetProduct?.status === 200) {
      const updateListAction = productsActions.updateList(resGetProduct.data);
      dispatch(updateListAction);
    }
    setLoading(false);
  };

  const loadCategoryById = async () => {
    console.log("Calling api get category");
    const resGetCategory = await APIGetCategoryByCategoryId(categoryId);
    setCategory(resGetCategory.data)
  }

  const loadTotalProductByCategoryId = async () => {
    console.log("Calling api get total product");
    const resGetTotalProductByCategoryId = await APIGetTotalProductByCategoryId(categoryId);
    setTotalProductByCategoryId(resGetTotalProductByCategoryId.data.totalSeries);
  };

  useEffect(() => {
    loadCategoryById()
    loadTotalProductByCategoryId();
    loadProductByCategoryId();
  }, [currentPage]);

  return (
    <div className='category'>
      <Header/>
      <BreadcrumbOption cateList={[]} />
      <ProductPageable
        productTitle={category.name}
        totalProduct={totalProductByCategoryId}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        products={products} />
      <Footer/>
    </div>
  )
}
