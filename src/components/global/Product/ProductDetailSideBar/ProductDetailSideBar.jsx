import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APIGetAllSeriesProductById } from '../../../../api/axios/productAPI';
import { productsActions } from '../../../../api/redux/slices/productSlice';

function ProductDetailSideBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { seriesId } = useParams();

    const relateSeries = useSelector((state) => state.products.list);

    const loadAllSeriesProductBySeriesId = async () => {
        console.log("Calling api get product series");
        const resGetRelateSeries = await APIGetAllSeriesProductById(seriesId);
        if (resGetRelateSeries?.status === 200) {
            const updateListAction = productsActions.updateList(resGetRelateSeries.data);
            dispatch(updateListAction);
        }
    };

    useEffect(() => {
        loadAllSeriesProductBySeriesId()
    }, [])

    return (
        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>You also love this</h5>
            </div>
            {relateSeries.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className="product__sidebar__view__item set-bg"
                        style={{
                            backgroundImage: `url("${item.image}")`,
                        }}
                        onClick={() => navigate(`/details/${item.id}`)}
                    >
                        <div className="ep">{item.currentNumberEpisode} / {item.totalEpisode}</div>
                        <div className="view">
                            <i className="fa fa-eye" /> {item.views}
                        </div>
                        <h5>
                            <a href="">{item.seriesName}</a>
                        </h5>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProductDetailSideBar
