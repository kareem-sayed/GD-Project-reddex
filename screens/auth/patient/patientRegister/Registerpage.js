import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import { login } from "../../../../backEnd/api/services/authApi";
import { useContext } from "react";
import { AuthContext } from "../../../../backEnd/context/AuthContext";
export default function Registerpage({ navigation }) {

  const [formData, setFormData] = useState({
    mail: "", 
    password: "",
  });

  const { loginUser } = useContext(AuthContext);

  const validateForm = () => {
    const { mail, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mail || !emailRegex.test(mail)) return false;
    if (!password || password.length < 8) return false;

    return true;
  };

 const handleLogin = async () => {
  console.log("LOGIN CLICKED");

  if (!validateForm()) {
    alert("تأكد من صحة البيانات");
    return;
  }

  try {

    const res = await login({
      email: formData.mail,
      password: formData.password,
    });

    console.log("LOGIN RESPONSE:", res);

    const token = res.data.data.token; 

    console.log("TOKEN:", token);

    if (token) {

      await loginUser(token, "patient");

      console.log("LOGIN SUCCESS");

    } else {

      console.log("TOKEN NOT FOUND");

      alert("التوكن غير موجود");
    }

  } catch (err) {

    console.log("LOGIN ERROR:", err);
    console.log("ERROR DATA:", err.response?.data);

    alert(
      err.response?.data?.message ||
      "حصل خطأ"
    );
  }
};

  const isValid = validateForm();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <Text style={styles.stepTitle}>تسجيل دخول</Text>

      <TouchableOpacity onPress={() => navigation.replace("PatientSignupFlow")}>
        <Text style={styles.noteText}>
          معندكش حساب؟ <Text style={styles.linkText}> انشئ حساب</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.inputsContainer}>
        <InputField
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          value={formData.mail}
          onChangeText={(val) =>
            setFormData({ ...formData, mail: val })
          }
          keyboardType="email-address"
        />
        <InputField
          label="كلمة السر"
          placeholder="كلمة السر"
          value={formData.password}
          onChangeText={(val) =>
            setFormData({ ...formData, password: val })
          }
          secureTextEntry
        />
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.helperText}> هل نسيت كلمة المرور؟ </Text>
        </TouchableOpacity>

        <View  style={styles.buttonBox}>
          <CustomButton
            title="تسجيل دخول"
            onPress={handleLogin}
            disabled={!isValid}
          />
        </View>

        
        
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
      position: "relative",
      flex: 1,
      alignItems: "right",
      paddingHorizontal: 20, // x:16 من Figma
      paddingTop: 40,       // y:150 من Figma
      backgroundColor: "#FAF7F2",
      height: "100%",
    },
    stepTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 15,
    marginBottom: 12,
    writingDirection: "rtl",
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    writingDirection: "rtl",
  },
  linkText: {
    color: "#7D0A0A",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  inputsContainer: {
    gap: 18,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
    textAlign: "right",
  },

  helperText: {
    fontSize: 16,
    color: "#5b5a5a",
    marginTop: 7,
    marginBottom: 8,
    writingDirection: "rtl",
  },
  buttonBox: {
    
  
  },
})