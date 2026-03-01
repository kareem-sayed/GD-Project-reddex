import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  I18nManager,
  Alert,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';

// Force RTL for Arabic
I18nManager.forceRTL(true);

export default function DoctorSignupFlow({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    // Screen 1: Basic info (انشئ حساب جديد)
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

    // Screen 2: Professional info (بياناتك المهنية)
    specialization: "",
    yearsOfExperience: "",
    workAddress: "",
    licenseNumber: "",

    // Screen 3: Clinic data (بيانات العيادة)
    clinicName: "",
    clinicAddress: "",
    workingHours: "",
    clinicPhone: "",

    // Screen 4: Document uploads (توثيق حسابك)
    idCard: null,
    practiceLicense: null,
    clinicCertificate: null,

    // Screen 5: Confirm data (تأكيد البيانات)
    // Review all data before submission
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - navigate to home or complete signup
      console.log("Doctor signup complete:", formData);
      navigation.replace("Home");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const getButtonLabel = () => {
    if (currentStep === totalSteps) return "انشاء حساب";
    return "التالي";
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Basic info
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phoneNumber.trim() !== "" &&
          formData.password.trim() !== "" &&
          formData.password.length >= 8 &&
          formData.confirmPassword.trim() !== "" &&
          formData.password === formData.confirmPassword
        );
      case 2: // Professional info
        return (
          formData.specialization.trim() !== "" &&
          formData.yearsOfExperience.trim() !== "" &&
          formData.workAddress.trim() !== "" &&
          formData.licenseNumber.trim() !== ""
        );
      case 3: // Clinic data
        return (
          formData.clinicName.trim() !== "" &&
          formData.clinicAddress.trim() !== "" &&
          formData.workingHours.trim() !== "" &&
          formData.clinicPhone.trim() !== ""
        );
      case 4: // Document uploads
        return (
          formData.idCard !== null &&
          formData.practiceLicense !== null &&
          formData.clinicCertificate !== null
        );
      case 5: // Confirm data - always valid
        return true;
      default:
        return false;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && (
          <Step1_BasicInfo formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 2 && (
          <Step2_ProfessionalInfo formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 3 && (
          <Step3_ClinicData formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 4 && (
          <Step4_Documents formData={formData} updateFormData={updateFormData} />
        )}
        {currentStep === 5 && (
          <Step5_Confirm formData={formData} />
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomSection}>
        <View style={styles.nextButtonWrapper}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.nextText}>
              {getButtonLabel()}
            </Text>
          </TouchableOpacity>
          {!isStepValid() && <View style={styles.buttonOverlay} />}
        </View>

        {currentStep > 1 && currentStep < totalSteps && (
          <TouchableOpacity
            style={styles.prevButton}
            onPress={handlePrev}
            activeOpacity={0.85}
          >
            <Text style={styles.prevText}>السابق</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// ─── SCREEN 1: Basic Info (انشئ حساب جديد) ─────────────────────────────────
function Step1_BasicInfo({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>انشئ حساب جديد</Text>
      <Text style={styles.stepSubtitle}>
        دخل بياناتك الأساسية علشان تقدر تستخدم كل مميزات التطبيق.{'\n'}
        عندك حساب بالفعل؟ تسجيل دخول
      </Text>

      <View style={styles.inputsContainer}>
        <InputField
          label="الاسم"
          placeholder="اسمك"
          value={formData.fullName}
          onChangeText={(val) => updateFormData("fullName", val)}
        />

        <InputField
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChangeText={(val) => updateFormData("email", val)}
          keyboardType="email-address"
        />

        <InputField
          label="رقم التليفون"
          placeholder="رقم التليفون"
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
        />
        <Text style={styles.helperText}>لازم تكون أكثر من 8 حروف</Text>

        <InputField
          label="تأكيد كلمة السر"
          placeholder="كلمة السر"
          value={formData.confirmPassword}
          onChangeText={(val) => updateFormData("confirmPassword", val)}
          secureTextEntry
        />
        <Text style={styles.helperText}>لازم تكون نفس كلمة السر</Text>
      </View>
    </View>
  );
}

// ─── SCREEN 2: Professional Info (بياناتك المهنية) ────────────────────────
function Step2_ProfessionalInfo({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>بياناتك المهنية</Text>
      <Text style={styles.stepSubtitle}>
        المعلومات دي هيورينا علشان نوفق حسابك كدكتور.
      </Text>

      <View style={styles.inputsContainer}>
        <InputField
          label="الاسم"
          placeholder="اسمك"
          value={formData.fullName}
          onChangeText={(val) => updateFormData("fullName", val)}
        />

        <InputField
          label="التخصص الطبي"
          placeholder="تخصصك"
          value={formData.specialization}
          onChangeText={(val) => updateFormData("specialization", val)}
        />

        <InputField
          label="سنين الخبرة"
          placeholder="كم سنة خبرة"
          value={formData.yearsOfExperience}
          onChangeText={(val) => updateFormData("yearsOfExperience", val)}
          keyboardType="number-pad"
        />

        <InputField
          label="رقم الترخيص الطبي"
          placeholder="رقم الترخيص"
          value={formData.licenseNumber}
          onChangeText={(val) => updateFormData("licenseNumber", val)}
        />
      </View>
    </View>
  );
}

// ─── SCREEN 3: Clinic Data (بيانات العيادة) ────────────────────────────────
function Step3_ClinicData({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>بيانات العيادة</Text>
      <Text style={styles.stepSubtitle}>
        قولنا عن مكان عيادتك علشان المرضى يتواصلوا معاك.
      </Text>

      <View style={styles.inputsContainer}>
        <InputField
          label="اسم العيادة / المكان الطبي"
          placeholder="اسم العيادة"
          value={formData.clinicName}
          onChangeText={(val) => updateFormData("clinicName", val)}
        />

        <InputField
          label="العنوان"
          placeholder="عنوان العيادة"
          value={formData.clinicAddress}
          onChangeText={(val) => updateFormData("clinicAddress", val)}
        />

        <InputField
          label="مواعيد العمل"
          placeholder="مواعيد العمل في العيادة"
          value={formData.workingHours}
          onChangeText={(val) => updateFormData("workingHours", val)}
        />

        <InputField
          label="رقم التواصل مع العيادة"
          placeholder="رقم للعيادة"
          value={formData.clinicPhone}
          onChangeText={(val) => updateFormData("clinicPhone", val)}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

// ─── SCREEN 4: Document Uploads (توثيق حسابك) ──────────────────────────────
function Step4_Documents({ formData, updateFormData }) {
  const pickDocument = async (fieldName, label) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        updateFormData(fieldName, result);
        Alert.alert('تم', `تم رفع ${label} بنجاح`);
      }
    } catch (err) {
      Alert.alert('خطأ', 'حدث خطأ أثناء رفع الملف');
    }
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>توثيق حسابك</Text>
      <Text style={styles.stepSubtitle}>
        ارفع المستندات المطلوبة علشان نأكد هويتك كدكتور.
      </Text>

      <View style={styles.uploadsContainer}>
        {/* ID Card Upload */}
        <UploadBlock
          label="صورة بطاقة الطبيب (ID Card)"
          formats=".pdf .jpg .png"
          file={formData.idCard}
          onPress={() => pickDocument('idCard', 'بطاقة الطبيب')}
        />

        {/* Practice License Upload */}
        <UploadBlock
          label="صورة رخصة مزاولة المهنة"
          formats=".pdf .jpg .png"
          file={formData.practiceLicense}
          onPress={() => pickDocument('practiceLicense', 'رخصة المزاولة')}
        />

        {/* Clinic Certificate Upload */}
        <UploadBlock
          label="صورة توضيحية للعيادة (اختياري)"
          formats=".pdf .jpg .png"
          file={formData.clinicCertificate}
          onPress={() => pickDocument('clinicCertificate', 'صورة العيادة')}
          optional
        />
      </View>

      <Text style={styles.uploadNote}>
        ملاحظة:{'\n'}
        المستندات خلال 24 لـ 48 ساعة
      </Text>
    </View>
  );
}

// ─── SCREEN 5: Confirm Data (تأكيد البيانات) ───────────────────────────────
function Step5_Confirm({ formData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>تأكيد البيانات</Text>
      <Text style={styles.stepSubtitle}>
        راجع بياناتك، وإذا كل حاجة تمام اضغط تأكيد.
      </Text>

      <View style={styles.confirmContainer}>
        {/* Personal Info Section */}
        <View style={styles.confirmSection}>
          <Text style={styles.confirmSectionTitle}>الاسم :</Text>
          <Text style={styles.confirmValue}>{formData.fullName || "محمد علي"}</Text>
        </View>

        <View style={styles.confirmSection}>
          <Text style={styles.confirmSectionTitle}>التخصص الطبي :</Text>
          <Text style={styles.confirmValue}>{formData.specialization || "باطنة"}</Text>
        </View>

        <View style={styles.confirmSection}>
          <Text style={styles.confirmSectionTitle}>رقم الترخيص الطبي :</Text>
          <Text style={styles.confirmValue}>{formData.licenseNumber || "123456/2018"}</Text>
        </View>

        <View style={styles.confirmDivider} />

        {/* Clinic Info Section */}
        <View style={styles.confirmSection}>
          <Text style={styles.confirmSectionTitle}>بيانات العيادة :</Text>
          <Text style={styles.confirmSubValue}>
            الاسم : {formData.clinicName || "عيادة الحياة"}
          </Text>
          <Text style={styles.confirmSubValue}>
            العنوان : {formData.clinicAddress || "شارع الطيران، مدينة نصر"}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── REUSABLE COMPONENTS ───────────────────────────────────────────────────

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#C8C8C8"
        textAlign="right"
      />
    </View>
  );
}

function UploadBlock({ label, formats, file, onPress, optional }) {
  return (
    <View style={styles.uploadBlock}>
      <View style={styles.uploadHeader}>
        <Text style={styles.uploadLabel}>{label}</Text>
        {optional && <Text style={styles.optionalBadge}>*</Text>}
      </View>

      <TouchableOpacity
        style={[styles.uploadBox, file && styles.uploadBoxFilled]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {file ? (
          <View style={styles.uploadSuccess}>
            <Text style={styles.uploadSuccessIcon}>✓</Text>
            <Text style={styles.uploadSuccessText}>{file.name}</Text>
          </View>
        ) : (
          <View style={styles.uploadEmpty}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>⬆</Text>
            </View>
            <Text style={styles.uploadFormats}>{formats}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },

  // ── Progress Bar ──
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#7D0A0A",
    borderRadius: 2,
  },

  // ── Step Container ──
  stepContainer: {
    marginTop: 20,
    direction: 'rtl',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "right",
  },
  stepSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
    textAlign: "right",
  },

  // ── Inputs ──
  inputsContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "right",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
    textAlign: "right",
  },
  helperText: {
    fontSize: 12,
    color: "#999",
    marginTop: -10,
    marginBottom: 4,
    textAlign: "right",
  },

  // ── Upload Blocks ──
  uploadsContainer: {
    gap: 20,
  },
  uploadBlock: {
    gap: 8,
  },
  uploadHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "right",
  },
  optionalBadge: {
    fontSize: 18,
    color: "#7D0A0A",
    fontWeight: "bold",
  },
  uploadBox: {
    height: 100,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D0D0D0",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBoxFilled: {
    borderColor: "#4CAF50",
    backgroundColor: "#F1F8F4",
  },
  uploadEmpty: {
    alignItems: "center",
    gap: 8,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIconText: {
    fontSize: 20,
    color: "#666",
  },
  uploadFormats: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  uploadSuccess: {
    alignItems: "center",
    gap: 8,
  },
  uploadSuccessIcon: {
    fontSize: 32,
    color: "#4CAF50",
  },
  uploadSuccessText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
    textAlign: "center",
  },
  uploadNote: {
    fontSize: 12,
    color: "#999",
    marginTop: 16,
    textAlign: "right",
    lineHeight: 18,
  },

  // ── Confirm Screen ──
  confirmContainer: {
    gap: 16,
  },
  confirmSection: {
    gap: 6,
  },
  confirmSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "right",
  },
  confirmValue: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  confirmSubValue: {
    fontSize: 13,
    color: "#888",
    textAlign: "right",
    paddingRight: 12,
  },
  confirmDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },

  // ── Bottom Buttons ──
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FAF7F2",
    gap: 12,
  },
  nextButtonWrapper: {
    position: 'relative',
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7D0A0A",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  buttonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(209, 213, 219, 0.7)',
    borderRadius: 12,
  },
  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  prevButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
  },
  prevText: {
    color: "#7D0A0A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});