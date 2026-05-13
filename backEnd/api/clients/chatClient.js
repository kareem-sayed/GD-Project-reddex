// chatClient.js
import axios from "axios";

const chatClient = axios.create({
    baseURL: "https://chat-api.com",
});

export default chatClient;