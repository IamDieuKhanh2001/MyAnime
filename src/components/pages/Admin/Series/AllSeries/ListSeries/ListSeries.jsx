import React, { useEffect, useState } from "react";
import "./ListSeries.scss";
import ReactStars from "react-rating-stars-component";
import { APIDeleteMovie, APIDeleteMovieSeries, APIGetMovieSeries } from "../../../../../../api/axios/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../../../api/redux/slices/adminSlice";
import LoadingAnimation from "../../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import UpdateSeries from "../../UpdateSeries/UpdateSeries";
import { CircularProgress, Dialog } from "@mui/material";
import _ from "lodash"
import { useConfirm } from 'material-ui-confirm';
export default function ListSeries() {
  const [selectedSerie, setSelectedSerie] = useState()
  const [loadingDelete, setLoadingDelete] = useState({status:false});
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const loadMovieSeries = async () => {
    setLoading(true)
    const resGetMovieSeries = await APIGetMovieSeries();
    if (resGetMovieSeries?.status === 200) {
      const updateMovieSeriesAction = adminActions.updateMovieSeries(resGetMovieSeries.data);
      dispatch(updateMovieSeriesAction)
    }
    setLoading(false)
  }
  const movieSeries = useSelector(state => state.admin.movieSeries)
  const deleteSeries = async (id, name) => {
    try {
      setLoadingDelete({
        id: id,
        status: true
      })
      const resGetMovieSeries = await APIDeleteMovieSeries(id);
      if (resGetMovieSeries?.status === 200) {
        toast.success(`Delete movie series ${name} success`)
        let movieSeriesTemp = [...movieSeries]
        _.remove(movieSeriesTemp, (movieSerie) => {
          return movieSerie.id === id
        })
        dispatch(adminActions.updateMovieSeries(movieSeriesTemp))
      }
    } catch (e) {
      console.log(e)
      toast.error(`Delete movie series ${name} fail`)
    } finally {
      setLoadingDelete({
        id: null,
        status: false
      })
    }
  }
  const handleButtonDeleteSeries = (id, name) => {
    confirm({}).then(() => {
      deleteSeries(id, name)
    })
  }
  useEffect(() => {
    loadMovieSeries()
  }, [])
  const handleButtonUpdateSeries = (series) => {
    console.log(series)
    setOpen(true)
    setSelectedSerie(series)
  }
  const hideDiaglogUpdate=()=>{
    setOpen(false)
  };
  return (
    <>
      {
        selectedSerie ?
          <Dialog key={selectedSerie.id} maxWidth="md" fullWidth={true} open={open} onClose={() => { setOpen(false) }}>
            <UpdateSeries hideDiaglogUpdate={hideDiaglogUpdate} key={selectedSerie.id} series={selectedSerie} />
          </Dialog> : null
      }
      <div className="titleList">List Series</div>
      {
        loading ? <LoadingAnimation /> : movieSeries ?
          movieSeries.map(movieSerie => {
            return (
              <div>
                <div className="allMovieLine">
                  <div className="allMovieContent">
                    <figure className="movieItemImg">
                      <img src={movieSerie.image?movieSerie.image:"https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"} alt="movie" />
                    </figure>
                    <div className="movieItemTitle">
                      {
                        movieSerie.name
                      }
                      <br />
                    </div>
                    <div className="movieItemStars">
                      <ReactStars
                        value={5}
                        edit={false}
                        isHalf={true}
                        size={20}
                        color="#FDDA0D"
                        activeColor="#FDDA0D"
                        className="star"
                      />
                    </div>
                    <button className="btn editButton">
                      <i className="bx bx-edit" onClick={() => { handleButtonUpdateSeries(movieSerie) }}></i>
                    </button>
                    {
                      loadingDelete.status && loadingDelete.id === movieSerie.id ? <CircularProgress key={movieSerie.id} /> :
                        <div className="btn deleteButton" onClick={() => { handleButtonDeleteSeries(movieSerie.id, movieSerie.name) }}>
                          <i className="bx bx-trash"></i>
                        </div>
                    }

                  </div>
                </div>


              </div>
            )
          })
          : null
      }

    </>
  );
}
