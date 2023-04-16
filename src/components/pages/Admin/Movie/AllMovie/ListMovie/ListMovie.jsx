import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Form, FormControl, InputGroup } from "react-bootstrap";
export default function ListMovie() {
  const [open, setOpen] = useState()
  const [loadingDelete, setLoadingDelete] = useState({ status: false })
  const [selectedMovie, setSelectedMovie] = useState()         //object phim muốn sửa
  const dispatch = useDispatch();
  const confirm = useConfirm();
  //sort movie
  const [mode, setMode] = useState('FindAll') //FindAll, FindByUsername 
  const [searchKeyword, setSearchKeyword] = useState('');
  const inputRef = useRef(null);
  //pageable
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  let movieList = useSelector((state) => state.admin.movies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const observer = useRef();

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
  const deleteMovie = async (id, title) => {
    try {
      setLoadingDelete({
        status: true,
        id: id
      })
      console.log("Calling api delete movie")
      const resDeleteMovie = await APIDeleteMovie(id);
      if (resDeleteMovie.status == 200) { //update new redux data
        const updateMoviesAction = adminActions.deleteItemInListMovies(id)
        dispatch(updateMoviesAction)
        toast.success(`Delete movie id: ${id} title: ${title} success`)
      }
    }
    catch (e) {
      console.log(e)
      toast.error(`Delete movie ${title} fail`)
    } finally {
      setLoadingDelete({
        status: false,
        id: null
      })
    }

  }
  const handleUpdateButton = () => {
    dispatch(adminActions.setShowModalUpdateMovie(true))
  }
  const handleOpenUpdateDialog = (movie) => {
    setOpen(true)                 //Mở dialog chỉnh sửa
    setSelectedMovie(movie)       //Lấy object phim muốn sửa
  }
  const handleButtonDeleteMovie = (id, title) => {
    confirm({}).then(() => {
      deleteMovie(id, title)
    })
  }
  const hideDiaglogUpdate = () => {
    setOpen(false)
  }
  //Sort list pageable
  // //Thay đổi data khi page đổi
  useEffect(() => {
    setLoading(true);
    APIGetMovie(page)
      .then(res => {
        console.log(res)
        if (res.data.length === 0) {
          setIsLastPage(true)
        } else {
          const updateMoviesAction = adminActions.addExtraToListMovies(res.data)
          dispatch(updateMoviesAction)
        }
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      })
  }, [page]);

  //Chuyển trang xóa redux movie list
  useEffect(() => {

    // Return a cleanup list redux
    return () => {
      dispatch(adminActions.updateMovies([]))
    };
  }, [])

  return (
    <>
      {
        selectedMovie ?
          <Dialog key={selectedMovie.id} maxWidth="md" fullWidth={true} open={open} onClose={() => { setOpen(false) }}>
            <UpdateMovie
              hideDiaglogUpdate={hideDiaglogUpdate}
              movie={selectedMovie}
            />
          </Dialog> : null
      }

      <div className="titleList">List Movies</div>
      {/* sort user */}
      <Form
        style={{ maxWidth: "500px" }}
      >
        <InputGroup className="mb-3" size="lg">
          <InputGroup.Text id="basic-addon1">
            <i className="bx bx-search-alt-2" />
          </InputGroup.Text>
          <FormControl
            placeholder={`Type username`}
            aria-label="Search users"
            aria-describedby="basic-addon1"
          // value={searchUsername}
          // ref={inputRef}
          // onChange={handleSearchChange}
          // onClick={handleClearClick}
          />
        </InputGroup>
      </Form>

      {/* end sort user */}
      <div className="allMovieLine">
        {
          movieList.map((movie, index) => {
            if (movieList.length === index + 1) {
              return (
                <div key={movie.id} className="allMovieContent" ref={lastItemRef}>
                  <div className="movieItemIndex">
                    {index + 1}
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
                      loadingDelete.status && loadingDelete.id === movie.id ? <CircularProgress key={movie.id} /> :
                        <div className="btn deleteButton" onClick={() => { handleButtonDeleteMovie(movie.id, movie.title) }}>
                          <i className="bx bx-trash"></i>
                        </div>
                    }
                  </div>
                </div>
              )
            } else {
              return (
                <div key={movie.id} className="allMovieContent">
                  <div className="movieItemIndex">
                    {index + 1}
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
                      loadingDelete.status && loadingDelete.id === movie.id ? <CircularProgress key={movie.id} /> :
                        <div className="btn deleteButton" onClick={() => { handleButtonDeleteMovie(movie.id, movie.title) }}>
                          <i className="bx bx-trash"></i>
                        </div>
                    }
                  </div>
                </div>
              )
            }
          })
        }
        {
          loading
          &&
          <LoadingAnimation />
        }
      </div>
    </>
  );
}
