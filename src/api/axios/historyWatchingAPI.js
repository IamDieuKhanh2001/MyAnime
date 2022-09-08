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