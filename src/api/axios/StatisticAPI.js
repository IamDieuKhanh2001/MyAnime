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

export const APIGetViewStatisticByYear = (year) => {
    const url = `/statistics/view/count-in-year`
    const params = {
        year,
      };
    return axiosClient
        .get(url, { params: params })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetTotalViewInYear = (year) => {
    const url = `/statistics/view/count-total-in-year`
    const params = {
        year,
      };
    return axiosClient
        .get(url, { params: params })
        .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetCategoriesViewStatistics = () => {
    const url = `/statistics/view/categories`
    return axiosClient
        .get(url)
        .catch((err) => console.log("Can't call API after 2 retries", err));
};