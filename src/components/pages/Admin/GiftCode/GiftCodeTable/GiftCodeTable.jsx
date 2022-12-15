import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { APIGetAllGiftCoode, APIGiftCodeDeleteById } from '../../../../../api/axios/Subscription';
import { adminActions } from '../../../../../api/redux/slices/adminSlice';
import LoadingAnimation from '../../../../global/LoadingAnimation/LoadingAnimation';
import { CircularProgress, Dialog } from "@mui/material";
import _ from "lodash"
import { toast } from "react-toastify";
import { useConfirm } from 'material-ui-confirm';

import "./GiftCodeTable.scss"

function GiftCodeTable() {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState({ status: false });

    const giftCodeList = useSelector(state => state.admin.giftcodeList)

    const loadAllGiftCode = async () => {
        setLoading(true)
        const resGetGiftCode = await APIGetAllGiftCoode();
        if (resGetGiftCode?.status === 200) {
            const updateMovieSeriesAction = adminActions.updateGiftcodeList(resGetGiftCode.data);
            dispatch(updateMovieSeriesAction)
        }
        setLoading(false)
    }

    const apiDeleteCode = async (id) => {
        try {
            setLoadingDelete({
                id: id,
                status: true
            })
            const resGetMovieSeries = await APIGiftCodeDeleteById(id);
            if (resGetMovieSeries?.status === 200) {
                toast.success(`Delete code success`)
                let giftCodeListTmp = [...giftCodeList]
                _.remove(giftCodeListTmp, (giftCode) => {
                    return giftCode.id === id
                })
                dispatch(adminActions.updateGiftcodeList(giftCodeListTmp))
            }
        } catch (e) {
            console.log(e)
            toast.error(`Delete code fail`)
        } finally {
            setLoadingDelete({
                id: null,
                status: false
            })
        }
    }

    const handleButtonDeleteGiftCode = (id, name) => {
        confirm({}).then(() => {
            apiDeleteCode(id, name)
        })
    }

    useEffect(() => {
        loadAllGiftCode()
    }, [])
    return (
        <div className="giftcodeTable">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box no-header clearfix">
                            <div className="main-box-body clearfix">
                                <div className="table-responsive">
                                    <table className="table user-list">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <span>Package name</span>
                                                </th>
                                                <th>
                                                    <span>Created</span>
                                                </th>
                                                <th>
                                                    <span>Day</span>
                                                </th>
                                                <th>
                                                    <span>Redemption code</span>
                                                </th>
                                                <th>
                                                    <span>Delete</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        {loading ? (<LoadingAnimation />) : (
                                            <tbody>
                                                {giftCodeList?.map((giftCode, index) => (
                                                    <tr key={index}>
                                                        <td className='dateCreated'>
                                                            {giftCode.subcriptionPackageDTO.name}
                                                        </td>
                                                        <td className="dateCreated">
                                                            {giftCode.createAt}
                                                        </td>
                                                        <td className="dateCreated">
                                                            {giftCode.subcriptionPackageDTO.day}
                                                        </td>
                                                        <td className='dateCreated'>
                                                            {giftCode.redemption_code}
                                                        </td>
                                                        <td>
                                                            {
                                                                loadingDelete.status && loadingDelete.id === giftCode.id ? <CircularProgress key={giftCode.id} /> :
                                                                    <button className="btn btn-danger" onClick={() => { handleButtonDeleteGiftCode(giftCode.id) }}>
                                                                        <i className="bx bx-trash"></i>
                                                                    </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GiftCodeTable