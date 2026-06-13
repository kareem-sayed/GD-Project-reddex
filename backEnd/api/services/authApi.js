import mainClient from "../clients/mainClient";
import { Platform } from 'react-native';

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

    
export const registerDeviceToken = async (fcmToken) => {
  try {
    const res = await mainClient.post('/notifications/device-token', {
      fcmToken: fcmToken,
      deviceOs: Platform.OS, // دي هترجع 'android' أو 'ios' لوحدها
    });
    console.log("✅ تم تسجيل التوكن بنجاح في الباك إند");
    return res.data;
  } catch (error) {
    console.log("❌ مشكلة في تسجيل التوكن:", error?.response?.data || error.message);
  }
};

// دالة الحذف (بننادي عليها وقت تسجيل الخروج Logout)
export const removeDeviceToken = async (fcmToken) => {
  try {
    // الـ Delete في Axios لما بنعوز نبعت Body بنكتبه جوه أوبجكت اسمه data
    const res = await mainClient.delete('/notifications/device-token', {
      data: { fcmToken: fcmToken }
    });
    console.log("🗑️ تم مسح التوكن بنجاح (Logout)");
    return res.data;
  } catch (error) {
    console.log("❌ مشكلة في مسح التوكن:", error?.response?.data || error.message);
  }
};