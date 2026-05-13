import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyCode({ navigation }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
          {/*description */}
          <View style={styles.centerSection}>
            <Text style={styles.headerTitleCenter}>بعتنالك كود التأكيد</Text>
            <Text style={styles.subTitle}>
              بعد إذنك، دخل الكود اللي بعتناه على رقم موبايلك علشان نقدر نكمل التسجيل.
            </Text>

            <View style={styles.otpContainer}>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  placeholder="-"
                  placeholderTextColor="#A0A0A0"
                />
              ))}
            </View>

            <Text style={styles.timerText}>
              الكود موصلش ؟ إعادة الإرسال بعد{" "}
              <Text style={{ color: "#D9534F", fontWeight: "600" }}>{timer} ثانية</Text>
            </Text>
          </View>

          {/* main button */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate("ResetPassword")}
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
  },
  timerText: {
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