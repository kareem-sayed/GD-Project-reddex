import aiClient from "../clients/aiClient";

export const analyzeData = (data) =>
    aiClient.post("/analyze", data);