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
        updateMovies: (state, actions) => {
            state.movies = actions.payload;
        },
        updateMovieSeries: (state, actions) => {
            state.movieSeries = actions.payload;
        },
        updateMovieCategories: (state, actions) => {
            state.movieCategories = actions.payload;
        },
        setShowModalUpdateMovie: (state, actions) => {
            state.isShowModalUpdateMovie = actions.payload;
        },
        setShowModalUpdateSerie: (state, actions) => {
            state.isShowModalUpdateSerie = actions.payload;
        },
        setInvalidUpdateMovie: (state, actions) => {
            state.isInvalidUpdateMovie = actions.payload;
        },
        setInvalidAddMovie: (state, actions) => {
            state.isInvalidAddMovie = actions.payload;
        },
        setIsUpdateMovie: (state, actions) => {
            state.isUpdateMovie = actions.payload;
        },
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
        updateGiftcodeList: (state, actions) => {
            state.giftcodeList = actions.payload;
        },
    },
});

const { reducer, actions } = admin;
export const adminActions = actions;
export default reducer;
