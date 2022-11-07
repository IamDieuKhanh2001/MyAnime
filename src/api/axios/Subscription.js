import { axiosClient } from "./axiosClient";

export const APIGetAllSubscriptionPackage = () => {
  const url = `/subscription-package`
  return axiosClient
    .get(url)
    .catch((err) => console.log("Can't call API after 2 retries", err));
};