import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";
import SignupProgressBar from "../../../components/SignupProgressBar";
// Force RTL for Arabic
I18nManager.forceRTL(true);

export default function Step1_BasicInfo({
  formData,
  updateFormData,
  nextStep,
}) {
  const isValid =
    formData.email &&
    formData.phoneNumber &&
    formData.password &&
    formData.password.length > 8 &&
    formData.password === formData.confirmPassword;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Progress Indicator
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.progressStepActive]} />
            <View style={[styles.progressStep, styles.progressStepInactive]} />
            <View style={[styles.progressStep, styles.progressStepInactive]} />
            <View style={[styles.progressStep, styles.progressStepInactive]} />
            <View style={[styles.progressStep, styles.progressStepInactive]} />
          </View>
        </View> */}
        <SignupProgressBar currentStep={1} />

        <Text style={styles.title}>انشئ حساب جديد</Text>
        <Text style={styles.subtitle}>
          دخل بياناتك الأساسية علشان نعمل حسابك كدكتور.
        </Text>
        <Text style={styles.noteText}>
          {"عندك حساب بالفعل؟\u00A0"}
          <Text style={styles.linkText}>تسجيل دخول</Text>
        </Text>
        <View style={styles.inputs}>
          <InputField
            label="البريد الإلكتروني"
            placeholder="بريدك الإلكتروني"
            value={formData.email}
            onChangeText={(val) => updateFormData("email", val)}
            keyboardType="email-address"
          />
          <InputField
            label="رقم التلفون"
            placeholder="رقم تليفونك"
            value={formData.phoneNumber}
            onChangeText={(val) => updateFormData("phoneNumber", val)}
            keyboardType="phone-pad"
          />
          <InputField
            label="كلمة السر"
            placeholder="كلمة السر"
            value={formData.password}
            onChangeText={(val) => updateFormData("password", val)}
            secureTextEntry
            helperText="لازم تكون اكثر من 8 حروف"
          />
          <InputField
            label="تأكيد كلمة السر"
            placeholder="كلمة السر"
            value={formData.confirmPassword}
            onChangeText={(val) => updateFormData("confirmPassword", val)}
            secureTextEntry
            helperText="لازم تكون نفس كلمة السر"
          />
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.disabled]}
          onPress={nextStep}
          disabled={!isValid}
        >
          <Text style={styles.nextText}>التالي</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  helperText,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#C8C8C8"
        textAlign="right"
        keyboardType={keyboardType}
        textContentType={secureTextEntry ? "password" : undefined}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  container: {
    padding: 24,
    flex: 1,
  },
  progressContainer: {
    marginBottom: 24,
    paddingTop: 10,
    width: "100%",
    alignItems: "flex-end",
  },
  progressBar: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  progressStep: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: "#7D0A0A",
  },
  progressStepInactive: {
    backgroundColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "row-reverse",
    writingDirection: "rtl",
    width: "100%",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
    textAlign: "row-reverse",
    writingDirection: "rtl",
    alignSelf: "flex-end",
    width: "100%",
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    width: "100%",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  linkText: {
    color: "#7D0A0A",
    fontWeight: "600",
    textDecorationLine: "underline",
    //  textAlign: "row-reverse",
  },
  inputs: {
    gap: 16,
    width: "100%",
    alignItems: "flex-end",
  },
  inputGroup: {
    gap: 6,
    width: "100%",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "row-reverse",
    alignSelf: "flex-end",
    width: "100%",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: "#333",
    textAlign: "right",
    width: "100%",
  },
  helperText: {
    fontSize: 15,
    color: "#999",
    textAlign: "row-reverse",
    alignSelf: "flex-end",
    width: "100%",
    marginTop: -4,
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    width: "100%",
    alignSelf: "flex-end",
  },
  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "#7D0A0A",
    opacity: 0.6,
  },
});
