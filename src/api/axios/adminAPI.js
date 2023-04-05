import { axiosClient } from "./axiosClient";

export const APIGetMovie = (id) => {
    // const url = "/movie";
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    const url = `/admin/movie`;
    return axiosClient
        .get(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIAddMovie = (movie) => {
    // const url = "/movie";
    const url = `/admin/movie`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .post(url, movie, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIUpdateMovie = (movie) => {
    // const url = "/movie";
    const url = `/admin/movie/${movie.id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .put(url, movie, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIDeleteMovie = (id) => {
    // const url = "/movie";
    const url = `/admin/movie/${id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .delete(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIGetMovieSeries = () => {
    // const url = "/movie";
    const url = `/admin/movie-series`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .get(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIGetMovieSerieById = () => {
    // const url = "/movie";
    const url = `/admin/movie-series`;
    return axiosClient
        .get(url)
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIAddMovieSeries = (bodyFormData) => {
    // const url = "/movie";
    const url = `/admin/movie-series`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
    };
    return axiosClient
        .post(url, bodyFormData, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIUpdateMovieSeries = (id, bodyFormData) => {
    // const url = "/movie";
    const url = `/admin/movie-series/${id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
    };
    return axiosClient
        .put(url, bodyFormData, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIDeleteMovieSeries = (id) => {
    // const url = "/movie";
    const url = `/admin/movie-series/${id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .delete(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetMovieCategories = () => {
    const url = `/category`;
    return axiosClient
        .get(url)
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIUpdateMovieCategories = (movie) => {
    const url = `admin/category-movie/${movie.id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .post(url, movie.category, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIAddMovieCategories = (id, cateArray) => {
    const url = `admin/category-movie/${id}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .post(url, cateArray, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIGetEpisodeBySeriesId = (seriesId) => {
    const url = `episode/series/${seriesId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .get(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIAddEpisode = (seriesId, bodyFormData) => {
    // const url = "/movie";
    const url = `/admin/episode/series/${seriesId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
    };
    return axiosClient
        .post(url, bodyFormData, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIUpdateEpisode = (epId, bodyFormData) => {
    // const url = "/movie";
    const url = `/admin/episode/${epId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
    };
    return axiosClient
        .put(url, bodyFormData, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIDeleteEpisode = (epId) => {
    // const url = "/movie";
    const url = `/admin/episode/${epId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
    };
    return axiosClient
        .delete(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIAddCategoryMovie = (movieId, categories) => {
    // const url = "/movie";
    const url = `/admin/category-movie/${movieId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .post(url, categories, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
export const APIGetAllUser=(page, keyword)=>{
    const url = `/admin/get-all-user`;
    const params = {
        page,
        keyword
      };
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .get(url, { headers: headers }, { params })
        .catch((err) => console.log("Can't call API after 2 retries", err));
}
export const APIBlockUser=(userId)=>{
    const url = `/admin/disable-user/${userId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .put(url,"", { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
}
export const APIUnBlockUser=(userId)=>{
    const url = `/admin/enable-user/${userId}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .put(url,"", { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
}