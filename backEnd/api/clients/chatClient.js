// chatClient.js
import axios from "axios";

const chatClient = axios.create({
    baseURL: "http://18.185.229.235/",
});

export default chatClient;