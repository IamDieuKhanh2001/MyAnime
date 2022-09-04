import { axiosClient } from "./axiosClient";


export const APIGetCategoryOfSeriesById = (id) => {
    // const url = "/movie";
    const url = `/category-movie/${id}`
    return axiosClient
      .get(url)
      .catch((err) => console.log("Can't call API after 2 retries", err));
  };