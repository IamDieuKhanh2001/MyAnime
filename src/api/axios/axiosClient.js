import axios from "axios";
import axiosRetry from "axios-retry";

export const axiosClient = axios.create({
    // Developer environment
    // baseURL: `https://4de5-2402-800-63eb-f115-f8ad-a75a-2a3-ca2c.ngrok-free.app`,
    // headers: {
    //     "ngrok-skip-browser-warning": "69420"
    // }
    baseURL: `http://localhost:8080`,

    // Production environment
    //  baseURL: `https://myanime-heroku.herokuapp.com`,
    //  baseURL: `https://myanimebe-production.up.railway.app`,


    // headers: {
    //   'content-type': 'application/json',
    // },
});

const retryDelay = (retryNumber = 0) => {
    const seconds = Math.pow(2, retryNumber) * 1000;
    const randomMs = 1000 * Math.random();
    return seconds + randomMs;
};

axiosRetry(axiosClient, {
    retries: 2,
    retryDelay,
    // retry on Network Error & 5xx responses
    retryCondition: axiosRetry.isRetryableError,
});
