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

export default function Step3_ClinicData({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const isValid =
    formData.clinicName &&
    formData.clinicAddress &&
    formData.workingHours &&
    formData.clinicPhone;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SignupProgressBar currentStep={3} />
        <Text style={styles.title}>بيانات العيادة</Text>
        <Text style={styles.subtitle}>
          قولنا عن مكان عيادتك علشان المرضى يتواصلوا معاك.
        </Text>

        <View style={styles.inputs}>
          <InputField
            label="اسم العيادة / المكان الطبي"
            value={formData.clinicName}
            placeholder="اسم العيادة"
            onChangeText={(val) => updateFormData("clinicName", val)}
          />
          <InputField
            label="العنوان"
            value={formData.clinicAddress}
            placeholder="عنوان العيادة"
            onChangeText={(val) => updateFormData("clinicAddress", val)}
          />
          <InputField
            label="مواعيد العمل"
            value={formData.workingHours}
            placeholder="مثال: 9 صباحًا - 5 مساءً"
            onChangeText={(val) => updateFormData("workingHours", val)}
          />
          <InputField
            label="رقم التواصل مع العيادة"
            value={formData.clinicPhone}
            placeholder="رقم تليفون العيادة"
            onChangeText={(val) => updateFormData("clinicPhone", val)}
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
      </View>
    </SafeAreaView>
  );
}

function InputField({ label, value, onChangeText, placeholder }) {
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
