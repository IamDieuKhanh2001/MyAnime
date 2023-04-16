import React, { useCallback, useEffect, useRef, useState } from "react";
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
  let movieSeries = useSelector((state) => state.admin.movieSeries)
  const [selectedSerie, setSelectedSerie] = useState()
  const [loadingDelete, setLoadingDelete] = useState({ status: false });
  const [open, setOpen] = useState(false)
  //sort movie
  const [mode, setMode] = useState('FindAll') //FindAll, FindByUsername 
  const [searchKeyword, setSearchKeyword] = useState('');
  const inputRef = useRef(null);
  //pageable
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observer = useRef();
  //interact with store redux
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const deleteSeries = async (id, name) => {
    try {
      setLoadingDelete({
        id: id,
        status: true
      })
      const resGetMovieSeries = await APIDeleteMovieSeries(id);
      if (resGetMovieSeries?.status === 200) {
        const updateMovieSeriesAction = adminActions.deleteItemInListMovieSeries(id) //Update redux
        dispatch(updateMovieSeriesAction)
        toast.success(`Delete movie series ${name} success`)
      }
    } catch (e) {
      console.log(e)
      toast.error(`Delete movie series id: ${id} name: ${name} fail`)
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
    setLoading(true);
    APIGetMovieSeries(page)
      .then(res => {
        console.log(res)
        if (res.data.length === 0) {
          setIsLastPage(true)
        } else {
          const updateMovieSeriesAction = adminActions.addExtraToListMovieSeries(res.data)
          dispatch(updateMovieSeriesAction)
        }
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      })
  }, [page]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || isLastPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, isLastPage]
  );


  //Chuyển trang xóa redux movie list
  useEffect(() => {
    return () => {
      // Return a cleanup list redux
      dispatch(adminActions.updateMovies([]))
      dispatch(adminActions.updateMovieSeries([]))
    }
  }, [])

  const handleButtonUpdateSeries = (series) => {
    setOpen(true)
    setSelectedSerie(series)
  }
  const hideDiaglogUpdate = () => {
    setOpen(false)
  };
  return (
    <>
      {selectedSerie ?
        <Dialog key={selectedSerie.id} maxWidth="md" fullWidth={true} open={open} onClose={() => { setOpen(false) }}>
          <UpdateSeries hideDiaglogUpdate={hideDiaglogUpdate} key={selectedSerie.id} series={selectedSerie} />
        </Dialog> : null
      }
      <div className="titleList">List Series</div>
      <div className="allMovieLine">
        {movieSeries.map((movieSerie, index) => {
          if (movieSeries.length === index + 1) {
            return (<div
              className="allMovieContent"
              ref={lastItemRef}
              key={movieSerie.id}>
              <figure className="movieItemImg">
                <img src={movieSerie.image ? movieSerie.image : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"} alt="movie" />
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
            </div>)
          } else {
            return (
              <div className="allMovieContent" key={movieSerie.id}>
                <figure className="movieItemImg">
                  <img src={movieSerie.image ? movieSerie.image : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"} alt="movie" />
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
            )
          }
        })
        }
        {
          loading && <LoadingAnimation />
        }
      </div>
      {/* {movieSeries.map((movieSerie) => {
        return (
          <div key={movieSerie.id} className="allMovieLine" ref={lastItemRef}>
            <div className="allMovieContent">
              <figure className="movieItemImg">
                <img src={movieSerie.image ? movieSerie.image : "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png"} alt="movie" />
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
        )
      })} */}

    </>
  );
}
