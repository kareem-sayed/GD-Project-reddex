import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import { resetPassword } from "../../../../backEnd/api/services/authApi";

export default function ResetPassword({ navigation, route }) {
  const { email, otp } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
  // Validate newPassword and confirmPassword
  if (!newPassword.trim() || !confirmPassword.trim()) {
    Alert.alert("خطأ", "الرجاء ملء جميع الحقول");
    return;
  }

  if (newPassword !== confirmPassword) {
    Alert.alert("خطأ", "كلمات المرور غير متطابقة");
    return;
  }

  if (newPassword.length < 8) {
    Alert.alert("خطأ", "كلمة المرور يجب أن تكون أكثر من 8 أحرف");
    return;
  }

  // Sanitize email and otp with aggressive cleaning
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanOtp = String(otp)
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\d]/g, "");

  // Validate OTP is numeric and correct length
  if (!/^\d{6}$/.test(cleanOtp)) {
    Alert.alert("خطأ", `الكود يجب أن يكون 6 أرقام فقط (الحالي: ${cleanOtp.length} أحرف)`);
    return;
  }

  setLoading(true);
  try {
    await resetPassword(cleanEmail, cleanOtp, newPassword);
    Alert.alert("نجح", "تم تغيير كلمة المرور بنجاح");
    navigation.reset({
      index: 0,
      routes: [{ name: "RoleSelectScreen" }],
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "فشل تغيير كلمة المرور";
    Alert.alert("خطأ", Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.adjustContent}>
            <Text style={styles.headerTitle}>تغيير كلمة السر</Text>
          </View>

          <View style={styles.inputsContainer}>
            <InputField
              label="كلمة السر الجديدة"
              placeholder="كلمة السر"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Text style={styles.hintText}>لازم يكون اكتر من 8 حروف</Text>

            <InputField
              label="تأكيد كلمة السر الجديدة"
              placeholder="تأكيد كلمة السر"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Text style={styles.hintText}>لازم تكون نفس كلمة السر</Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[styles.mainButton, loading && styles.buttonDisabled]}
                onPress={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>تعيين كلمة السر</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  adjustContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 30,
    color: "#1A1A1A",
  },
  inputsContainer: {
    gap: 15,
  },
  hintText: {
    fontSize: 13,
    color: "#999",
    textAlign: "left",
    marginTop: -10,
    marginBottom: 5,
  },
  buttonWrapper: {
    marginTop: 40,
  },
  mainButton: {
    backgroundColor: "#7D0A0A",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
