// mainClient.js
import axios from "axios";
import { getToken } from "../../storage/tokenStorage";

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

export default mainClient;