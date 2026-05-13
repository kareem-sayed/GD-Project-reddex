import React, { createContext, useState, useEffect } from "react";
import { getToken, saveToken, removeToken } from "../storage/tokenStorage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) setUserToken(token);
      setLoading(false);
    };

    loadToken();
  }, []);

  const loginUser = async (token) => {
    await saveToken(token);
    setUserToken(token);
  };

  const logoutUser = async () => {
    await removeToken();
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoggedIn: !!userToken,
        loginUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}