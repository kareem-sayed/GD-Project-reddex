import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { forgotPassword } from "../../../../backEnd/api/services/authApi";

export default function VerifyCode({ navigation, route }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    if (!otpCode || otpCode.length !== 6) {
      Alert.alert("خطأ", "الرجاء إدخال كود التأكيد كاملاً");
      return;
    }
    navigation.navigate("ResetPassword", { email, otp: otpCode });
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await forgotPassword(email);
      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      Alert.alert("نجح", "تم إعادة إرسال الكود بنجاح");
    } catch (error) {
      Alert.alert("خطأ", error.response?.data?.message || "فشل إعادة إرسال الكود");
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
          <View style={styles.centerSection}>
            <Text style={styles.headerTitleCenter}>بعتنالك كود التأكيد</Text>
            <Text style={styles.subTitle}>
              بعد إذنك، دخل الكود اللي بعتناه على رقم موبايلك علشان نقدر نكمل التسجيل.
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder="-"
                  placeholderTextColor="#A0A0A0"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={(event) => handleKeyPress(index, event)}
                />
              ))}
            </View>

            {canResend ? (
              <TouchableOpacity onPress={handleResend} disabled={loading}>
                <Text style={styles.resendText}>
                  الكود موصلش ؟{" "}
                  <Text style={{ color: "#D9534F", fontWeight: "600" }}>
                    {loading ? "جاري الإرسال..." : "إعادة الإرسال"}
                  </Text>
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                الكود موصلش ؟ إعادة الإرسال بعد{" "}
                <Text style={{ color: "#D9534F", fontWeight: "600" }}>{timer} ثانية</Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>تأكيد</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );


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
          <View style={styles.centerSection}>
            <Text style={styles.headerTitleCenter}>بعتنالك كود التأكيد</Text>
            <Text style={styles.subTitle}>
              بعد إذنك، دخل الكود اللي بعتناه على رقم موبايلك علشان نقدر نكمل التسجيل.
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder="-"
                  placeholderTextColor="#A0A0A0"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={(event) => handleKeyPress(index, event)}
                />
              ))}
            </View>

            {canResend ? (
              <TouchableOpacity onPress={handleResend} disabled={loading}>
                <Text style={styles.resendText}>
                  الكود موصلش ؟{" "}
                  <Text style={{ color: "#D9534F", fontWeight: "600" }}>
                    {loading ? "جاري الإرسال..." : "إعادة الإرسال"}
                  </Text>
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                الكود موصلش ؟ إعادة الإرسال بعد{" "}
                <Text style={{ color: "#D9534F", fontWeight: "600" }}>{timer} ثانية</Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>تأكيد</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingBottom: 40,
    justifyContent: "center",
  },
  centerSection: {
    alignItems: "center",
    marginTop: 60,
  },
  headerTitleCenter: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "#000",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
    direction: "ltr",
  },
  otpInput: {
    width: 48,
    height: 55,
    backgroundColor: "#FFF2E0",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    writingDirection: "ltr",
    direction: "ltr",
  },
  timerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
  },
  resendText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
  },
  mainButton: {
    backgroundColor: "#7D0A0A",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});