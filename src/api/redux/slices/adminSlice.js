import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    movieSeries: [],
    movieCategories: [],
    movieSeriesEp: [],
    giftcodeList: [],
    isShowModalUpdateMovie: false,  //ko dùng đến
    isShowModalUpdateSerie: false,
    isInvalidUpdateMovie: false, //true: phim ko thể chỉnh sửa, false: phim có thể chỉnh sửa
    isInvalidAddMovie: false, //true: phim ko thể add, false: phim có thể add
    isUpdateMovie: false, //true: đang chế độ update, false: đang ko trong update (add, delete)
    isInvalidAddEpisode: false,
    isInvalidUpdateEpisode: false,
    isUpdateEpisode: false,
};

const admin = createSlice({
    name: "products",
    initialState,
    reducers: {
        //Action for movie list
        updateMovies: (state, actions) => {
            //update with new array 
            state.movies = actions.payload;
        },
        addExtraToListMovies: (state, action) => {
            const newMovies = action.payload.filter((movie) => { //Remove duplicated item
                return !state.movies.find((existingMovie) => existingMovie.id === movie.id);
            });
            state.movies = state.movies.concat(newMovies);
        },

        addFirstListMovies: (state, action) => {
            //Add item to first index
            const newMovies = [action.payload, ...state.movies];
            state.movies = newMovies;
        },
        replaceItemInListMovies: (state, actions) => {
            //Replace item in list with new
            state.movies = state.movies.map(item => {
                if (item.id === actions.payload.id) {
                    return { ...item, ...actions.payload };
                } else {
                    return item;
                }
            })
        },
        deleteItemInListMovies: (state, actions) => {
            //Remove item in list with id
            const idToRemove = actions.payload;
            state.movies = state.movies.filter(movie => movie.id !== idToRemove);
        },
        setIsUpdateMovie: (state, actions) => {
            state.isUpdateMovie = actions.payload;
        },
        setInvalidUpdateMovie: (state, actions) => {
            state.isInvalidUpdateMovie = actions.payload;
        },
        setInvalidAddMovie: (state, actions) => {
            state.isInvalidAddMovie = actions.payload;
        },
        //Action for movie series list
        updateMovieSeries: (state, actions) => {
            state.movieSeries = actions.payload;
        },
        addExtraToListMovieSeries: (state, actions) => {
            const newSeries = actions.payload.filter((item) => { //Remove duplicated item
                return !state.movieSeries.find((existingItem) => existingItem.id === item.id);
            });
            state.movieSeries = state.movieSeries.concat(newSeries);
        },

        addFirstListMovieSeries: (state, action) => {
            //Add item to first index
            const newMovieSeries = [action.payload, ...state.movieSeries];
            state.movieSeries = newMovieSeries;
        },
        replaceItemInListMovieSeries: (state, actions) => {
            //Replace item in list with new
            state.movieSeries = state.movieSeries.map(item => {
                if (item.id === actions.payload.id) {
                    return { ...item, ...actions.payload };
                } else {
                    return item;
                }
            })
        },
        deleteItemInListMovieSeries: (state, actions) => {
            //Remove item in list with id
            const idToRemove = actions.payload;
            state.movieSeries = state.movieSeries.filter(movie => movie.id !== idToRemove);
        },
        //Action for movie Categories list
        updateMovieCategories: (state, actions) => {
            state.movieCategories = actions.payload;
        },
        setShowModalUpdateMovie: (state, actions) => {
            state.isShowModalUpdateMovie = actions.payload;
        },
        setShowModalUpdateSerie: (state, actions) => {
            state.isShowModalUpdateSerie = actions.payload;
        },
        //Episode 
        setMovieSeriesEp: (state, actions) => {
            state.movieSeriesEp = actions.payload;
        },
        setInvalidAddEpisode: (state, actions) => {
            state.isInvalidAddEpisode = actions.payload;
        },
        setInvalidUpdateEpisode: (state, actions) => {
            state.isInvalidUpdateEpisode = actions.payload;
        },
        setIsUpdateEpisode: (state, actions) => {
            state.isUpdateEpisode = actions.payload;
        },
        //Giftcode
        updateGiftcodeList: (state, actions) => {
            state.giftcodeList = actions.payload;
        },
    },
});

const { reducer, actions } = admin;
export const adminActions = actions;
export default reducer;
