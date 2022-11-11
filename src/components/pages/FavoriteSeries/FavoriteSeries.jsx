import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { APIGetAllUserFavoriteSeries } from '../../../api/axios/productAPI'
import { productsActions } from '../../../api/redux/slices/productSlice'
import Header from '../../global/Header/Header'
import { Layout } from '../../global/Layout/Layout'
import NormalBreadcrumb from '../../global/NormalBreadcrumb/NormalBreadcrumb'
import FavoriteSeriesItem from './FavoriteSeriesItem/FavoriteSeriesItem'

function FavoriteSeries() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const favoriteList = useSelector((state) => state.products.favoriteList);
    const dispatch = useDispatch();

    const loadFavorite = async () => {
        console.log("Calling api get favorite");
        setLoading(true)
        const resGetFavorite = await APIGetAllUserFavoriteSeries();
        console.log(resGetFavorite)
        if (resGetFavorite?.status === 200) {
            const updateFavoriteListAction = productsActions.updateFavoriteList(resGetFavorite.data);
            dispatch(updateFavoriteListAction);
        }
        setLoading(false)
    };

    useEffect(() => {
        loadFavorite();

    }, []);
    return (
        <div>
            <div className="products">
                <div className="product spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="popular__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>{t("favorite.anime_section")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {favoriteList?.map((favoriteItem, index) => (
                                            <FavoriteSeriesItem key={index} data={favoriteItem} />
                                        ))}
                                    </div>
                                </div>
                                <div className="recent__product">
                                    <div className="row">
                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                            <div className="section-title">
                                                <h4>{t("favorite.show_section")}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoriteSeries
