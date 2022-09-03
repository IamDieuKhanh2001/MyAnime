import { axiosClient } from "./axiosClient";

export const APIGetProducts = () => {
  const url = "/movie";
  // const url = "/movie-and-series"
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

