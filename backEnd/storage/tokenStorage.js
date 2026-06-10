import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "user_token";
const ROLE_KEY = "user_role";

export const saveToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

// function to save the user's role
export const saveRole = async (role) => {
  await AsyncStorage.setItem(ROLE_KEY, role);
};

// function to get the user's role
export const getRole = async () => {
  return await AsyncStorage.getItem(ROLE_KEY);
};

// function to remove both token and role from storage when the user logs out or when the token expires
export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(ROLE_KEY); // 
};