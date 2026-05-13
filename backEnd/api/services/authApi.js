import mainClient from "../clients/mainClient";

export const login = (data) => mainClient.post("/auth/login", data);
   

export const patientSignup = (data) => {
    return mainClient.post("/auth/register/patient", data, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    };