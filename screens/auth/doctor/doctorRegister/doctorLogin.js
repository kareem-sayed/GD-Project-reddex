import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../../../backEnd/context/AuthContext";

// استيراد دالة الـ login الجاهزة من ملف الـ auth api بتاعكم
import { login } from "../../../../backEnd/api/services/authApi";
// استيراد دالة حفظ التوكن
import { saveToken } from "../../../../backEnd/storage/tokenStorage";

export default function DoctorLogin({ navigation }) {
  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  // الـ state المسؤولة عن التحميل (تأكدنا من وجودها داخل الـ Component)
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { mail, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mail || !emailRegex.test(mail)) return false;
    if (!password || password.length < 8) return false;

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Alert.alert("تنبيه", "تأكد من صحة البيانات");
      return;
    }

    try {
      setLoading(true); // 👈 هنا هيشوفها ويشغلها بدون مشاكل الآن

      const loginData = {
        email: formData.mail.trim(),
        password: formData.password,
      };

      // const response = await login(loginData);

      // console.log("LOGIN RESPONSE:", res);

      // const token = res.data.data.token;

      const response = await login(loginData);
      console.log("FULL RESPONSE:", JSON.stringify(response.data, null, 2));
      console.log("LOGIN RESPONSE:", response.data);

      const token = response?.data?.data?.token;
      console.log("TOKEN:", token);
      if (token) {
        // await loginUser(token, "doctor");
        console.log("BEFORE LOGIN USER");
        console.log("TOKEN:", token);

        await loginUser(token, "doctor");

        console.log("AFTER LOGIN USER");
      } else {
        Alert.alert("خطأ", "لم يتم العثور على التوكن في استجابة السيرفر.");
      }
    } catch (error) {
      console.log(
        "❌ LOGIN API ERROR:",
        error?.response?.data || error.message,
      );

      const serverMessage = error?.response?.data?.message;
      Alert.alert(
        "فشل تسجيل الدخول",
        Array.isArray(serverMessage)
          ? serverMessage[0]
          : serverMessage || "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isValid = validateForm();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <Text style={styles.stepTitle}>تسجيل دخول للدكتور</Text>

      <TouchableOpacity onPress={() => navigation.replace("DoctorSignupFlow")}>
        <Text style={styles.noteText}>
          معندكش حساب؟ <Text style={styles.linkText}> انشئ حساب</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.inputsContainer}>
        <InputField
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          value={formData.mail}
          onChangeText={(val) => setFormData({ ...formData, mail: val })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="كلمة السر"
          placeholder="كلمة السر"
          value={formData.password}
          onChangeText={(val) => setFormData({ ...formData, password: val })}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.helperText}> هل نسيت كلمة المرور؟ </Text>
        </TouchableOpacity>

        <View style={styles.buttonBox}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#641919"
              style={{ marginVertical: 10 }}
            />
          ) : (
            <CustomButton
              title="تسجيل دخول"
              onPress={handleLogin}
              disabled={!isValid}
            />
          )}
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
    paddingTop: 40, // y:150 من Figma
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
  buttonBox: {},
});
