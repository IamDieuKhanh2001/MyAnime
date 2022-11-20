import { axiosClient } from "./axiosClient";

export const APIGetEpisodeBySeriesId = (seriesId) => {
  const url = `/episode/series/` + seriesId;
  const jwt = window.sessionStorage.getItem("jwt");

  const headers = {
      Authorization: jwt !== null ? `Bearer ${jwt}` : ``,
  };

  console.log(headers.Authorization);
  return axiosClient
    .get(url, { headers: headers })
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIEpisodeIncreaseView = (episodeId) => {
  const url = `/episode/increaseview/` + episodeId
  return axiosClient
    .patch(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};