// chatApi.js
import chatClient from "../clients/chatClient";

export const sendMessage = (message) =>
    chatClient.post("/chat", { message });