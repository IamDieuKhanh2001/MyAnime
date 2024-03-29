import { axiosClient } from "./axiosClient";

export const APILogin = (username, password) => {
    const url = "/authentication/login";
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
    const url = "/authentication/register";
    const data = {
        username,
        password,
    };
    return axiosClient.post(url, data).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APIChangeAvatar = (pic) => {
    const url = "/user/avatar/upload";
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "content-type": "multipart/form-data",
    };

    const data = new FormData();
    data.append("avatar", pic);

    return axiosClient.post(url, data, { headers: headers });
};

export const APIUpdateInfoUserLogging = (fullName, email) => {
    const url = "/user/user-detail";
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    const data = {
        fullName,
        email,
    };

    return axiosClient.put(url, data, { headers: headers });
};

export const APIVerifyUserEmailOTP = (otpCode) => {
    const url = `/user/user-detail/mail/checkOTP/${otpCode}`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient.get(url, { headers: headers }).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APICheckIsPremiumMember = () => {
    const url = `/user/user-detail/premium/check`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient.get(url, { headers: headers }).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APIGetRemainTimePremiumMember = () => {
    const url = `/user/user-detail/premium/remain`;
    const jwt = window.sessionStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    return axiosClient.get(url, { headers: headers }).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });
};

export const APIGetMailVerification = (email) => {
    const url = "/account/forget-password";
    const data = {
        email,
    };
    return axiosClient.post(url, data).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });;
};

export const APIResetUserPassword = (email, otpCode, newPassword) => {
    const url = "/account/reset-password";
    const data = {
        email,
        code_confirmation: otpCode,
        new_password: newPassword,
    };
    return axiosClient.post(url, data).catch((err) => {
        console.log("Can't call API after 2 retries", err);
        return err;
    });;
};

export const APIGetTotalUsers = (keyword) => {
    const url = "/admin/user/count";
    const params = {
      keyword
    };
    return axiosClient
      .get(url, { params })
      .catch((err) => console.log("Can't call API after 2 retries", err));
  };