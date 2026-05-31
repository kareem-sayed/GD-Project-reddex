import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "user_token";
const ROLE_KEY = "user_role"; // ✅ مفتاح جديد للـ Role

export const saveToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

// ✅ فانكشن لحفظ الـ Role
export const saveRole = async (role) => {
  await AsyncStorage.setItem(ROLE_KEY, role);
};

// ✅ فانكشن لقراءة الـ Role
export const getRole = async () => {
  return await AsyncStorage.getItem(ROLE_KEY);
};

// التعديل هنا ليمسح التوكن والـ Role سوا عند الـ Logout
export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(ROLE_KEY); // ✅ امسح الـ Role كمان
};