import React, { useEffect, useState } from "react";
import "./ListMovie.scss";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { APIDeleteMovie, APIGetMovie } from "../../../../../../api/axios/adminAPI";
import { adminActions } from "../../../../../../api/redux/slices/adminSlice";
import LoadingAnimation from "../../../../../global/LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";
import { CircularProgress, Dialog, DialogTitle } from "@mui/material";
import UpdateMovie from "../../UpdateMovie/UpdateMovie";
import _ from "lodash"
import { useConfirm } from 'material-ui-confirm';
export default function ListMovie() {
  const [loading, setLoading] = useState()
  const [open, setOpen] = useState()
  const [loadingDelete, setLoadingDelete] = useState({status:false})
  const [selectedMovie, setSelectedMovie] = useState()         //object phim muốn sửa
  const dispatch = useDispatch();
  const movies = useSelector(state => state.admin.movies)
  const confirm = useConfirm();
  const loadMovies = async () => {
    console.log("Calling api get movies")
    setLoading(true)
    const resGetMovies = await APIGetMovie();
    if (resGetMovies?.status === 200) {
      const updateMoviesAction = adminActions.updateMovies(resGetMovies.data)
      dispatch(updateMoviesAction);
    }
    console.log(resGetMovies.data)
    setLoading(false)

  }
  const deleteMovie = async (id, title) => {
    try {
      setLoadingDelete({
        status: true,
        id:id
      })
      console.log("Calling api delete movie")
      const resDeleteMovie = await APIDeleteMovie(id);
      if (resDeleteMovie?.status === 200) {
        let moviesTemp = [...movies];
        const test = _.remove(moviesTemp, (movie) => {
          return movie.id === id;
        })
        dispatch(adminActions.updateMovies(moviesTemp))
        toast.success(`Delete movie ${title} success`)
      }
    } catch (e) {
      console.log(e)
      toast.error(`Delete movie ${title} fail`)
    } finally {
      setLoadingDelete({
        status:false,
        id:null
      })
    }

  }
  useEffect(() => {
    loadMovies()
  }, [])
  const handleUpdateButton = () => {
    dispatch(adminActions.setShowModalUpdateMovie(true))
  }
  const handleOpenUpdateDialog = (movie) => {
    setOpen(true)                 //Mở dialog chỉnh sửa
    setSelectedMovie(movie)       //Lấy object phim muốn sửa
  }
  const handleButtonDeleteMovie=(id,title)=>{
    confirm({}).then(()=>{
      deleteMovie(id,title)
    })
  }
  const hideDiaglogUpdate=()=>{
    setOpen(false)
  }
  return (
    <>
      {
        selectedMovie ?
          <Dialog key={selectedMovie.id} maxWidth="md" fullWidth={true} open={open} onClose={() => { setOpen(false) }}>
            <UpdateMovie hideDiaglogUpdate={hideDiaglogUpdate} movie={selectedMovie} />
          </Dialog> : null
      }

      <div className="titleList">List Movies</div>
      <div className="allMovieLine">
        {
          loading ? <LoadingAnimation /> : movies ? movies.map((movie,index) => {
            return (
              <div key={movie.id} className="allMovieContent">
                <div className="movieItemIndex">
                  {index+1}
                  <br />
                </div>
                <div className="movieItemTitle">
                  {movie.title}
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

                <button className="btn editButton" onClick={() => { handleOpenUpdateDialog(movie) }}>
                  <i className="bx bx-edit"></i>
                </button>
                <div key={movie.id}>
                  {
                    loadingDelete.status&&loadingDelete.id===movie.id ? <CircularProgress key={movie.id} /> :
                      <div className="btn deleteButton" onClick={() => { handleButtonDeleteMovie(movie.id, movie.title) }}>
                        <i className="bx bx-trash"></i>
                      </div>
                  }
                </div>


              </div>
            );
          }) : null
        }
      </div>
    </>
  );
}
