import axios from "axios";

const aiClient = axios.create({
    baseURL: "https://ai-api.com",
    timeout: 20000, // مهم عشان AI ممكن يتأخر
});

export default aiClient;