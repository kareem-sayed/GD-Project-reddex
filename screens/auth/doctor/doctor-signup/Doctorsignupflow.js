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

export default function DoctorSignupFlow({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  //   Step1
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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

  const updateFormData = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

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
            type: file.mimeType,
          },
        }));
      }
    } catch (error) {
      console.log("Document error:", error);
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
        ّ
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
          <Step5_Confirm formData={formData} prevStep={prevStep} navigation={navigation} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
