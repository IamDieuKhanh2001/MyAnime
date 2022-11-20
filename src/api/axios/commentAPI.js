import { axiosClient } from "./axiosClient";

export const APIGetCommentByEpisodeId = (epId) => {
    // const url = "/movie";
    const url = `/comment/episode/${epId}`
    return axiosClient
        .get(url)
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIPostCommentByEpisodeId = (content, episodeId) => {
    const url = "/user/comment";
    const requestBody = {
        content: content,
        episodeId: episodeId,
    };
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .post(url, requestBody, { headers: headers })
        .catch((err) => {
            console.log("Can't call API after 2 retries", err);
            return err;
        });
};

export const APIGetSeriesCommentRecent = (limit) => {
    // const url = "/movie";
    const url = `/movie-and-series/comment/recent/` + limit
    return axiosClient
        .get(url)
        .catch((err) => console.log("Can't call API after 2 retries", err));
};
