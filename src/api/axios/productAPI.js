import { axiosClient } from "./axiosClient";

export const APIGetProducts = (page) => {
  const url = `/movie-and-series?page=` + page
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetProductById = (id) => {
  const url = `/movie-and-series/` + id
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetAllSeriesProductById = (seriesId) => {
  const url = `/movie-and-series/get-all-series/` + seriesId
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetTotalProduct = () => {
  const url = "/movie-and-series/count";
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetProductsByCategoryId = (categoryId, page) => {
  // const url = `/movie-and-series/category/${categoryId}?page=` + page
  const url = `/movie-and-series/category/${categoryId}?page=` + page

  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetTotalProductByCategoryId = (categoryId) => {
  // const url = `/movie-and-series/category/${categoryId}/count`;
  const url = `/movie-and-series/category/${categoryId}/count`;
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};