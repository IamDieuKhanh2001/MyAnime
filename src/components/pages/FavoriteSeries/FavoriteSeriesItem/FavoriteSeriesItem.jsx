import _ from 'lodash';
import { useConfirm } from 'material-ui-confirm';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APISaveOrDeleteUserFavoriteSeries } from '../../../../api/axios/productAPI';
import { productsActions } from '../../../../api/redux/slices/productSlice';

function FavoriteSeriesItem({ data }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const dispatch = useDispatch();
    const favoriteList = useSelector((state) => state.products.favoriteList);

    const unsaveSeries = async (seriesId, name) => {
        try {
            console.log("Calling api delete favorite")
            const resDeleteFavorite = await APISaveOrDeleteUserFavoriteSeries(seriesId);
            console.log(resDeleteFavorite)
            if (resDeleteFavorite?.status === 204) {
                let favoriteUpdateList = [...favoriteList];
                _.remove(favoriteUpdateList, (favoriteDeleteItem) => {
                    return favoriteDeleteItem.movieSeriesId === seriesId;
                })

                dispatch(productsActions.updateFavoriteList(favoriteUpdateList))
                toast.success(`Un save series ${name} success`)
            }
        } catch (e) {
            console.log(e)
            toast.error(`Un save series ${name} fail`)
        }
    }

    const handleUnSaveSeries = (seriesId, name) => {
        confirm({}).then(() => {
            unsaveSeries(seriesId, name)
        })
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div
                    onClick={() => navigate(`/details/${data.movieSeriesId}`)}
                    className="product__item__pic set-bg"
                    style={{
                        backgroundImage: `url(${data.image})`,
                    }}
                >
                </div>
                <div
                    className="product__item__text">
                    <h5>
                        <a href="#">{data.name}</a>
                    </h5>
                    <button onClick={() => { handleUnSaveSeries(data.movieSeriesId, data.name) }} type="button" className="btn btn-danger mt-2">
                        {t("favorite.btn_unsave_series")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteSeriesItem
