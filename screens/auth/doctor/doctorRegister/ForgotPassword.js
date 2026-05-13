import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity , KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        <InputField
          label="رقم التليفون"
          placeholder="رقم تلفونك"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("VerifyCode")}
        >
          <Text style={styles.buttonText}>التالي</Text>
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
  headerTitleCenter: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 15,
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
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: -10,
    marginBottom: 5,
  },
  mainButton: {
    backgroundColor: "#7D0A0A",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
