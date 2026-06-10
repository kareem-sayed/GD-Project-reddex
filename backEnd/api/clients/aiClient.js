import axios from "axios";

const aiClient = axios.create({
    baseURL: "http://18.185.229.235:8000/diagnose/",
     // مهم عشان AI ممكن يتأخر
});

export default aiClient;