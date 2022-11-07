import { axiosClient } from "./axiosClient";

export const APIGetAllSubscriptionPackage = () => {
  const url = `/subscription-package`
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGetSubscriptionHistory = () => {
  const url = `/user/user-detail/premium/history`
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
      Authorization: `Bearer ${jwt}`,
  };
  return axiosClient
    .get(url, { headers: headers })
    .catch((err) => console.log("Can't call API after 2 retries", err));
};