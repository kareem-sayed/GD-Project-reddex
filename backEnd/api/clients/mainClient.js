// mainClient.js
import axios from "axios";
import { getToken, removeToken } from "../../storage/tokenStorage";

const mainClient = axios.create({
    baseURL: "http://63.180.89.122:3000",
});

mainClient.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

mainClient.interceptors.response.use(

    (response) => response,

    async (error) => {

        if (error.response?.status === 401) {

        console.log("Token expired");

        await removeToken();

        }

        return Promise.reject(error);
    }
);

export default mainClient;