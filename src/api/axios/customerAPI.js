import { axiosClient } from "./axiosClient";

export const APILogin = (username, password) => {
    const url = "/login";
    const userData = {
        username: username,
        password: password,
    };
    return axiosClient.post(url, userData).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APIProfileUserLoging = () => {
    const url = "/user/user-detail";
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient.get(url, { headers: headers }).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APIRegister = (username, password) => {
    const url = "/register";
    const data = {
        username,
        password,
    };
    return axiosClient.post(url, data).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};
