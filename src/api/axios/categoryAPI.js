import { axiosClient } from "./axiosClient";


export const APIGetCategoryOfSeriesById = (id) => {
  // const url = "/movie";
  const url = `/category-movie/${id}`
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetCategoryByCategoryId = (categoryId) => {
  // const url = "/movie";
  const url = `/category/${categoryId}`
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetAllCategory = () => {
  // const url = "/movie";
  const url = `/category`
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};