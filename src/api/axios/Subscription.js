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

export const APIUserRedeemGiftcode = (redemptionCode) => {
  const url = "/user/giftcode/redeem";
  const data = {
    "redemption_code": redemptionCode,
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

export const APIGetAllGiftCoode = () => {
  const url = `/admin/giftcode/all`
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
      Authorization: `Bearer ${jwt}`,
  };
  return axiosClient
    .get(url, { headers: headers })
    .catch((err) => console.log("Can't call API after 2 retries", err));
};

export const APIGiftCodeSpawn = (subscriptionPackageId, quantity) => {
  const url = `/admin/giftcode/create/package/` + subscriptionPackageId;
  const data = {
    quantity,
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

export const APIGiftCodeDeleteById = (subscriptionPackageId) => {
  const url = `/admin/giftcode/delete/` + subscriptionPackageId;
  const jwt = window.sessionStorage.getItem("jwt");
  const headers = {
      Authorization: `Bearer ${jwt}`,
  };
  return axiosClient.delete(url, { headers: headers }).catch((err) => {
      console.log("Can't call API after 2 retries", err);
      return err;
  });
};

export const APICreateOrderPremium = (method, subcriptionPackageId) => {
  const url = `/user/premium/create/order`;
  const data = {
    method,
    "subcription_package_id": subcriptionPackageId
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