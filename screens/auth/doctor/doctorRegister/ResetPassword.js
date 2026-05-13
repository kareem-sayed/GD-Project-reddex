import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";

export default function ResetPassword({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              value={password}
              onChangeText={setPassword}
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
              {/* main button */}
              <TouchableOpacity
                style={styles.mainButton}
                onPress={() => navigation.navigate("DoctorLogin")}
              >
                <Text style={styles.buttonText}>تعيين كلمة السر</Text>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 30,
    color: "#1A1A1A",
  },
  headerTitleCenter: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 15,
    textAlign: "left",
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
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
  contentCenter: {
    flex: 1,
    justifyContent: "center",
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
