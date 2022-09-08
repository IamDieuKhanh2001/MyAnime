import { axiosClient } from "./axiosClient";

export const APIGetEpisodeBySeriesId = (seriesId) => {
  const url = `/episode/series/` + seriesId
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};