import { axiosClient } from "./axiosClient";

export const APIGetCommentByEpisodeId = (epId) => {
    // const url = "/movie";
    const url = `/user/comment/episode/${epId}`
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
      .get(url, { headers: headers })
      .catch((err) => console.log("Can't call API after 2 retries", err));
  };