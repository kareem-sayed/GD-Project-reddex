import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import SignupProgressBar from "../../../components/SignupProgressBar";

import { ScrollView } from "react-native";
export default function Step2_ProfessionalInfo({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const isValid =
    formData.fullName &&
    formData.specialization &&
    formData.yearsOfExperience &&
    formData.licenseNumber;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SignupProgressBar currentStep={2} />
          <Text style={styles.title}>بياناتك المهنية</Text>
          <Text style={styles.subtitle}>
            المعلومات دي ضرورية علشان نوثق حسابك كدكتور.
          </Text>
        
        <View style={styles.inputs}>
          <InputField
            label="الاسم"
            placeholder="اسمك"
            value={formData.fullName}
            onChangeText={(val) => updateFormData("fullName", val)}
          />
          <InputField
            label="التخصص الطبي"
            placeholder="تخصصك الطبي"
            value={formData.specialization}
            onChangeText={(val) => updateFormData("specialization", val)}
          />
          <InputField
            label="سنين الخبرة"
            placeholder="خبرة كام سنة"
            value={formData.yearsOfExperience}
            onChangeText={(val) => updateFormData("yearsOfExperience", val)}
          />
          <InputField
            label="رقم الترخيص الطبي"
            placeholder="رقم الترخيص"
            value={formData.licenseNumber}
            onChangeText={(val) => updateFormData("licenseNumber", val)}
          />
        </View>
        <View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.nextButton, !isValid && styles.disabled]}
              onPress={nextStep}
              disabled={!isValid}
            >
              <Text style={styles.nextText}>التالي</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
              <Text style={styles.prevText}>السابق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InputField({ label, placeholder, value, onChangeText }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C8C8C8"
        textAlign="right"
        writingDirection="rtl"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  container: { padding: 24, flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  inputs: { gap: 16 },
  inputGroup: { gap: 6 },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    fontSize: 15,
    color: "#333",
    textAlign: "right",
  writingDirection: "rtl", // مهم للـ placeholder يظهر صح
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  prevButton: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  prevText: { fontSize: 18, fontWeight: "700", color: "#7D0A0A" },
  nextButton: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  disabled: { backgroundColor: "#7D0A0A" },
});
