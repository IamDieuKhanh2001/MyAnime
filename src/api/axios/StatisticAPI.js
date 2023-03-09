import { axiosClient } from "./axiosClient";

export const APIGetUserStatistic = () => {
    const url = `/statistics/user/get-number-of-user`
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient
        .get(url, { headers: headers })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};