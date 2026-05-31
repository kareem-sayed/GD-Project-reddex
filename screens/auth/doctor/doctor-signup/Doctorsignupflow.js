import React, { useState } from "react";
import { View, StatusBar, ScrollView, Alert } from "react-native";
import { I18nManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
I18nManager.forceRTL(true);

import Step1_BasicInfo from "./Step1_CreateAccount";
import Step2_ProfessionalInfo from "./Step2_ProfessionalData";
import Step3_ClinicData from "./Step3_ClinicData";
import Step4_Documents from "./Step4_VerifyAccount";
import Step5_Confirm from "./Step5_ConfirmData";
import { saveToken } from "../../../../backEnd/storage/tokenStorage";
import { AuthContext } from "../../../../backEnd/context/AuthContext";

export default function DoctorSignupFlow({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //   Step1
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    ssn: "",
    birthdate: "",
    gender: "",
    specialization: "",
    yearsOfExperience: "",
    workAddress: "",
    licenseNumber: "",
    clinicName: "",
    clinicAddress: "",
    workingHours: "",
    clinicPhone: "",
    idCard: null,
    practiceLicense: null,
    clinicCertificate: null,
  });
  const totalSteps = 5;
  const updateFormData = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
  // const nextStep = () => setCurrentStep(currentStep + 1);
  // const prevStep = () => setCurrentStep(currentStep - 1);

  const validateStep = () => {
    // --- STEP 1: Create Account ---
    if (currentStep === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (!emailRegex.test(formData.email)) {
        return "البريد الإلكتروني غير صالح";
      }
      if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
        return "رقم الهاتف مطلوب";
      }
      if (!formData.birthdate || !formData.birthdate.trim()) {
        return "تاريخ الميلاد مطلوب";
      }
      if (!formData.gender) {
        return "يرجى تحديد النوع";
      }
      if (!passwordRegex.test(formData.password)) {
        return "كلمة المرور ضعيفة (يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص)";
      }
      if (formData.password !== formData.confirmPassword) {
        return "كلمة المرور غير متطابقة";
      }
    }

    // --- STEP 2: Professional Data ---
    if (currentStep === 2) {
      const ssnRegex = /^\d{9,14}$/;

      if (!formData.fullName || !formData.fullName.trim()) {
        return "الاسم بالكامل مطلوب";
      }
      if (!ssnRegex.test(formData.ssn)) {
        return "الرقم القومي غير صالح (يجب أن يكون من 9 إلى 14 رقم)";
      }
      if (!formData.specialization || !formData.specialization.trim()) {
        return "التخصص الطبي مطلوب";
      }
      if (!formData.yearsOfExperience || !formData.yearsOfExperience.trim()) {
        return "سنين الخبرة مطلوبة";
      }
      if (!formData.licenseNumber || !formData.licenseNumber.trim()) {
        return "رقم الترخيص الطبي مطلوب";
      }
    }

    // --- STEP 3: Clinic Data ---
    if (currentStep === 3) {
      if (!formData.clinicName || !formData.clinicName.trim()) {
        return "اسم العيادة مطلوب";
      }
      if (!formData.clinicAddress || !formData.clinicAddress.trim()) {
        return "عنوان العيادة مطلوب";
      }
      if (!formData.workingHours || !formData.workingHours.trim()) {
        return "مواعيد العمل مطلوبة";
      }
    }

    // --- STEP 4: Documents Verification ---
    if (currentStep === 4) {
      if (!formData.idCard) {
        return "برجاء رفع صورة بطاقة الطبيب";
      }
      if (!formData.practiceLicense) {
        return "برجاء رفع صورة ترخيص مزاولة المهنة";
      }
    }

    return null;
  };

  const nextStep = () => {
    const errorMessage = validateStep();

    if (errorMessage) {
      Alert.alert("خطأ", errorMessage);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const pickDocument = async (fieldName) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];

        setFormData((prev) => ({
          ...prev,
          [fieldName]: {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || "image/jpeg",
          },
        }));
      }
    } catch (err) {
      // console.log("Document error:", error);
      console.log("Doctor Signup Error:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);

      Alert.alert(
        "خطأ في التسجيل",
        Array.isArray(err.response?.data?.message)
          ? err.response.data.message.join("\n")
          : err.response?.data?.message || "حصل خطأ أثناء إنشاء الحساب.",
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF7F2" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {currentStep === 1 && (
          <Step1_BasicInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Step2_ProfessionalInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Step3_ClinicData
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Step4_Documents
            formData={formData}
            updateFormData={updateFormData}
            pickDocument={pickDocument}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Step5_Confirm
            formData={formData}
            prevStep={prevStep}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
