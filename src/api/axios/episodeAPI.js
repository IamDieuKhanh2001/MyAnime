import { axiosClient } from "./axiosClient";

export const APIGetEpisodeBySeriesId = (seriesId) => {
  const url = `/episode/series/` + seriesId
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIEpisodeIncreaseView = (episodeId) => {
  const url = `/episode/increaseview/` + episodeId
  return axiosClient
    .patch(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};