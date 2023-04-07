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

    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [isLastPage, setIsLastPage] = useState(false);
    const [error, setError] = useState(false);

    const loadProductByKeyword = async () => {
        setLoading(true);
        console.log("Calling api get product");
        const resGetProduct = await APIGetProducts(currentPage, kw)
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
        loadProductByKeyword();
    }, [currentPage, kw]);

    return (
        <div className='search__kw'>
            <Header />
            <BreadcrumbOption />
            <ProductPageable
                productTitle={`Result for: ${kw}`}
                setCurrentPage={setCurrentPage}
                loading={loading}
                error={error}
                isLastPage={isLastPage}
                products={products} />
            <Footer />
        </div>
    )
}

export default SearchKeyword
