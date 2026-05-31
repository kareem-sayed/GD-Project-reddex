import React, { createContext, useState, useEffect } from "react";
// ✅ استدعاء الفانكشنز الجديدة للـ Role
import { getToken, saveToken, removeToken, saveRole, getRole } from "../storage/tokenStorage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // ✅ الـ State بتاعة الـ Role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const token = await getToken();
        const role = await getRole(); // ✅ قراءة الـ Role المخزن
        
        if (token) setUserToken(token);
        if (role) setUserRole(role);
      } catch (error) {
        console.log("Error loading storage data:", error);
      } finally {
        setLoading(false); // ✅ فك التعليق عن الأبلكيشن في كل الأحوال
      }
    };

    loadStorageData();
  }, []);

  // ✅ تعديل فانكشن الـ Login لتستقبل التوكن والـ Role معاً عند نجاح الـ API
  const loginUser = async (token, role) => {
    await saveToken(token);
    // تحويل الـ Role لسمول لضمان تطابق الشروط في الـ Navigator
    const normalizedRole = role?.toLowerCase(); 
    await saveRole(normalizedRole);
    
    setUserToken(token);
    setUserRole(normalizedRole);
  };

  const logoutUser = async () => {
    await removeToken(); // بيمسح التوكن والـ Role من الـ AsyncStorage
    setUserToken(null);
    setUserRole(null); // تصغير الـ Role
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userRole, // ✅ بـاصي الـ userRole عشان الـ RootNavigator يقرأها
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