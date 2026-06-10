import mainClient from "../clients/mainClient";

export const login = (data) => mainClient.post("/auth/login", data);
   
export const forgotPassword = async (email) => {
  const res = await mainClient.post('/auth/forgot-password', { email });
  return res.data.data; 
};

export const resetPassword = async (email, otp, newPassword) => {
  const res = await mainClient.post('/auth/reset-password', { email, otp, password: newPassword });
  return res.data.data;
};


export const patientSignup = (data) => {
    return mainClient.post("/auth/register/patient", data, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    });
    };