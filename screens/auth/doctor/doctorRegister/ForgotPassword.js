import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity , KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import { forgotPassword } from "../../../../backEnd/api/services/authApi";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("خطأ", "الرجاء إدخال البريد الإلكتروني");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("خطأ", "البريد الإلكتروني غير صحيح");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      navigation.navigate("VerifyCode", { email });
    } catch (error) {
      Alert.alert("خطأ", error.response?.data?.message || "حدث خطأ في الاتصال");
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
      <Text style={styles.headerTitle}>نسيت كلمة السر</Text>

      <View style={styles.inputsContainer}>
        <InputField
          label="البريد الإلكتروني"
          placeholder="بريدك الإلكتروني"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={[styles.mainButton, loading && styles.buttonDisabled]}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>التالي</Text>
          )}
        </TouchableOpacity>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "left",
    marginTop: 30,
    marginBottom: 20,
    color: "#1A1A1A",
  },
  inputsContainer: {
    gap: 15,
  },
  mainButton: {
    backgroundColor: "#7D0A0A",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
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
