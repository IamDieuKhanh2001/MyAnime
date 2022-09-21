import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    movieSeries: [],
    movieCategories:[],
    isShowModalUpdateMovie:false,
    isShowModalUpdateSerie:false,
    isInvalidUpdateMovie:false,
    isInvalidAddMovie:false,
    isUpdateMovie:false,
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
        updateMovieCategories:(state,actions)=>{
            state.movieCategories=actions.payload;
        },
        setShowModalUpdateMovie:(state,actions)=>{
            state.isShowModalUpdateMovie=actions.payload
        },
        setShowModalUpdateSerie:(state,actions)=>{
            state.isShowModalUpdateSerie=actions.payload
        },
        setInvalidUpdateMovie:(state,actions)=>{
            state.isInvalidUpdateMovie=actions.payload
        },
        setInvalidAddMovie:(state,actions)=>{
            state.isInvalidAddMovie=actions.payload
        },
        setIsUpdateMovie:(state,actions)=>{
            state.isUpdateMovie=actions.payload
        }
        
    },
});

const { reducer, actions } = admin;
export const adminActions = actions;
export default reducer;