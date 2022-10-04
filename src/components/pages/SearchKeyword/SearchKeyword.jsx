import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APIGetProducts, APIGetTotalProduct } from '../../../api/axios/productAPI';
import { productsActions } from '../../../api/redux/slices/productSlice';
import BreadcrumbOption from '../../global/BreadcrumbOption/BreadcrumbOption';
import Footer from '../../global/Footer/Footer';
import Header from '../../global/Header/Header';
import ProductPageable from '../../global/Product/ProductPageable/ProductPageable';

function SearchKeyword() {
    const { kw } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [totalProductByKeyword, setTotalProductByKeyword] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)

    const products = useSelector((state) => state.products.list);

    const loadProductByKeyword = async () => {
        setLoading(true);
        console.log("Calling api get product");
        const resGetProduct = await APIGetProducts(currentPage, kw);
        console.log(resGetProduct)
        if (resGetProduct?.status === 200) {
            const updateListAction = productsActions.updateList(resGetProduct.data);
            dispatch(updateListAction);
        }
        setLoading(false);
    };

    const loadTotalProductByKeyword = async () => {
        console.log("Calling api get total product");
        const resGetTotalProduct = await APIGetTotalProduct(kw);
        console.log(resGetTotalProduct)
        setTotalProductByKeyword(resGetTotalProduct.data.totalSeries);
    };

    useEffect(() => {
        loadProductByKeyword();
        loadTotalProductByKeyword();
    }, [currentPage,kw]);

    return (
        <div className='search__kw'>
            <Header />
            <BreadcrumbOption />
            <ProductPageable
                productTitle={`Result for: ${kw}`}
                totalProduct={totalProductByKeyword}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                loading={loading}
                products={products} />
            <Footer />
        </div>
    )
}

export default SearchKeyword
