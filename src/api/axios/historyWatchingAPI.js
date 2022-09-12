import { axiosClient } from "./axiosClient";

export const APIGetHistoriesSeriesUserLogging = () => {
    const url = `/user/history`
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .get(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIHistoriesSeriesUserLoggingSave = (lastSecond, episode_id) => {
    console.log(lastSecond)
    console.log(episode_id)
    const url = "/user/history";
    const data = {
        lastSecond,
        episode_id,
    };
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient.post(url, data, { headers: headers }).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};