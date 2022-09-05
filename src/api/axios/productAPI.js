import { axiosClient } from "./axiosClient";

export const APIGetProducts = (page) => {
  // const url = "/movie";
  const url = `/movie-and-series?page=` + page
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetProductById = (id) => {
  // const url = "/movie";
  const url = `/movie-and-series/` + id
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetAllSeriesProductById = (seriesId) => {
  // const url = "/movie";
  const url = `/movie-and-series/get-all-series/` + seriesId
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetTotalProduct = () => {
  const url = "/movie-and-series/count";
  // const url = "/movie-and-series"
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};
