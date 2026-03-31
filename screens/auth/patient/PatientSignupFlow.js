import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Force RTL for Arabic
// I18nManager.forceRTL(true);

export default function PatientSignupFlow({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    // Screen 1: Basic info (انشئ حساب جديد)
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

    // Screen 2: Personal info (معلومات عنك)
    fullName: "",
    nationalId: "",
    birthDate: "",
    gender: null, // 'male' or 'female'

    // Screen 3: Health condition 1 (الحالة الصحية)
    chronicDiseases: null, // 'yes' or 'no'
    chronicDiseasesDetails: "", // text field when yes

    // Health condition 2 (الحالة الصحية)
    takingMedication: null, // 'yes' or 'no'
    takingMedicationDetails: "", // text field when yes

    // Screen 4: Help info (نساعدك في ايه؟)
    helpNeeded: [], // Array of selected help options
  });

  const totalSteps = 4;

  const handleNext = () => {
    console.log("Current step:", currentStep, "Total steps:", totalSteps);
    console.log("Is valid?", isStepValid());

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      console.log("Moving to step:", nextStep);
      setCurrentStep(nextStep);
    } else {
      // Final step - navigate to home or complete signup
      console.log("Signup complete - navigating to SignupSuccess");
      navigation.navigate("SignupSuccess");
    }
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const getButtonLabel = () => {
    if (currentStep === 1) return "انشئ حساب";
    if (currentStep === totalSteps) return "تم";
    return "التالي";
  };
  
  const isStepValid = () => {
    switch (currentStep) {
      case 1: // Basic info
        return (
          formData.email.trim() !== "" &&
          formData.phoneNumber.trim() !== "" &&
          formData.password.trim() !== "" &&
          formData.password.length >= 8 &&
          formData.confirmPassword.trim() !== "" &&
          formData.password === formData.confirmPassword
        );
      case 2: // Personal info
        return (
          formData.fullName.trim() !== "" &&
          formData.nationalId.trim() !== "" &&
          formData.birthDate.trim() !== "" &&
          formData.gender !== null
        );
      case 3: // Health
        return (
          formData.chronicDiseases !== null &&
          formData.takingMedication !== null
        );
      case 4: // Help - always valid (optional screen)
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
        {/* Debug info */}
        <Text
          style={{
            textAlign: "center",
            marginTop: 8,
            fontSize: 12,
            color: "#666",
          }}
        >
          Step {currentStep} of {totalSteps}
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && (
          <>
            {console.log("Rendering Step 1")}
            <Step1_BasicInfo
              formData={formData}
              updateFormData={updateFormData}
              navigation={navigation}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            {console.log("Rendering Step 2")}
            <Step2_PersonalInfo
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            {console.log("Rendering Step 3")}
            <Step3_Health formData={formData} updateFormData={updateFormData} />
          </>
        )}
        {currentStep === 4 && (
          <>
            {console.log("Rendering Step 4 - HELP SCREEN")}
            <Step4_Help formData={formData} updateFormData={updateFormData} />
          </>
        )}

        {/* Bottom Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            disabled={!isStepValid()}
            style={[
              styles.nextButton,
              !isStepValid() && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text
              style={[styles.nextText, !isStepValid() && styles.nextTextDisabled]}
            >
              {getButtonLabel()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

// ─── SCREEN 1: Basic Info (انشئ حساب جديد) ─────────────────────────────────
function Step1_BasicInfo({ formData, updateFormData, navigation }) {
  return (
    <SafeAreaView style={styles.stepContainer}>
      <Text style={styles.stepTitle}>انشئ حساب جديد</Text>
      <Text style={styles.stepSubtitle}>
        سجل بياناتك الأساسية علشان تعمل حسابك وتقدر تستخدم كل مميزات التطبيق.
      </Text>

      <TouchableOpacity
      onPress={() => navigation.replace("Registerpage")}
        >
        <Text style={styles.noteText}>
          عندك حساب بالفعل؟ <Text style={styles.linkText}>تسجيل دخول</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.inputsContainer}>
        <InputField
          label="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChangeText={(val) => updateFormData("email", val)}
          keyboardType="email-address"
        />

        <InputField
          label="رقم التليفون"
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
        />
        <Text style={styles.helperText}>لازم تكون أكثر من 8 حروف</Text>

        <InputField
          label="تأكيد كلمة السر"
          placeholder="كلمة السر"
          value={formData.confirmPassword || ""}
          onChangeText={(val) => updateFormData("confirmPassword", val)}
          secureTextEntry
        />
        <Text style={styles.helperText}>لازم تكون نفس كلمة السر</Text>
      </View>
      
    </SafeAreaView>
  );
}

// ─── SCREEN 2: Personal Info (معلومات عنك) ─────────────────────────────────
function Step2_PersonalInfo({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>معلومات عنك</Text>
      <Text style={styles.stepSubtitle}>
        المعلومات دي هتساعدنا نقدم ليك التجاريح بشكل أدق.
      </Text>

      <View style={styles.inputsContainer}>
        <InputField
          label="الاسم"
          placeholder="اسمك"
          value={formData.fullName}
          onChangeText={(val) => updateFormData("fullName", val)}
        />
        <InputField
          label="الرقم القومي"
          placeholder="رقمك القومي"
          value={formData.nationalId}
          onChangeText={(val) => updateFormData("nationalId", val)}
          keyboardType="number-pad"
        />
        <InputField
          label="السن"
          placeholder="عندك كام سنة"
          value={formData.birthDate}
          onChangeText={(val) => updateFormData("birthDate", val)}
          keyboardType="number-pad"
        />

        <Text style={styles.fieldLabel}>النوع</Text>
        <View style={styles.radioRow}>
          <RadioButton
            label="ذكر"
            selected={formData.gender === "male"}
            onPress={() => updateFormData("gender", "male")}
          />
          <RadioButton
            label="أنثى"
            selected={formData.gender === "female"}
            onPress={() => updateFormData("gender", "female")}
          />
        </View>
      </View>
    </View>
  );
}

// ─── SCREEN 3: Health Screen (الحالة الصحية) ─────────────────────────────
function Step3_Health({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>الحالة الصحية</Text>
      <Text style={styles.stepSubtitle}>
        لو عندك أي حاجة مهمة نعرفها، قولنا!
      </Text>

      <View style={styles.questionsContainer}>
        {/* سؤال الأمراض المزمنة */}
        <QuestionBlock
          question="هل عندك أمراض مزمنة؟"
          selected={formData.chronicDiseases}
          onSelect={(val) => updateFormData("chronicDiseases", val)}
        />

        {/* يظهر فقط لو قال نعم */}
        {formData.chronicDiseases === "yes" && (
          <View style={styles.conditionalInput}>
            <TextInput
              style={styles.multilineInput}
              placeholder="لو في أمراض زي الضغط، السكر... اكتبها"
              value={formData.chronicDiseasesDetails}
              onChangeText={(val) =>
                updateFormData("chronicDiseasesDetails", val)
              }
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#CCC"
            />
          </View>
        )}

        {/* سؤال الأدوية */}
        <QuestionBlock
          question="هل بتاخد أي أدوية بانتظام؟"
          selected={formData.takingMedication}
          onSelect={(val) => updateFormData("takingMedication", val)}
        />

        {/* يظهر فقط لو قال نعم */}
        {formData.takingMedication === "yes" && (
          <View style={styles.conditionalInput}>
            <TextInput
              style={styles.multilineInput}
              placeholder="اسم الدواء أو الاستخدام..."
              value={formData.takingMedicationDetails}
              onChangeText={(val) =>
                updateFormData("takingMedicationDetails", val)
              }
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#CCC"
            />
          </View>
        )}
      </View>
    </View>
  );
}

// ─── SCREEN 4: Help Info (نساعدك في ايه؟) ───────────────────
function Step4_Help({ formData, updateFormData }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>نساعدك في ايه؟</Text>
      <Text style={styles.stepSubtitle}>
        علشان نقدر لك افضل تجربة، اختار اللي عايز المساعدة فيه من الاختيارات دي:
      </Text>

      <View style={styles.checkboxList}>
        <CheckboxItem label="تتابع التحاليل الخاص بيك بشكل دوري" />
        <CheckboxItem label="تفهم نتيجة تحاليل سابقة بشكل أفضل" />
        <CheckboxItem label="التنبيهات المناسبة لحالتك" />
        <CheckboxItem label="تكوين التحاليل أو الأدوية" />
        <CheckboxItem label="متابعة تطوّر صحتك مع الوقت" />
      </View>
    </View>
  );
}

// ─── REUSABLE COMPONENTS ───────────────────────────────────────────────────

function CheckboxItem({ label }) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setChecked(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

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
        placeholderTextColor="#999"
      />
    </View>
  );
}

function RadioButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.radioCircle, selected && styles.radioCircleSelected]}
      >
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function QuestionBlock({ question, selected, onSelect }) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.radioRow}>
        <RadioButton
          label="لا"
          selected={selected === "no"}
          onPress={() => onSelect("no")}
        />
        <RadioButton
          label="أه"
          selected={selected === "yes"}
          onPress={() => onSelect("yes")}
        />
      </View>
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
    paddingBottom: 100,
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
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
    marginTop: 15,
    marginBottom: 12,
    writingDirection: "rtl",
  },
  stepSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
    writingDirection: "rtl",
  },
  noteText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    writingDirection: "rtl",
  },
  linkText: {
    color: "#7D0A0A",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // ── Checkboxes ──
  checkboxList: {
    gap: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#999",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7D0A0A",
    borderColor: "#7D0A0A",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
    flex: 1,
    writingDirection: "rtl",
  },

  // ── Inputs ──
  inputsContainer: {
    gap: 18,
  },
  inputGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    writingDirection: "rtl",
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
    marginTop: -12,
    marginBottom: 8,
    writingDirection: "rtl",
  },

  // ── Radio Buttons ──
  radioRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#999",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#7D0A0A",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7D0A0A",
  },
  radioLabel: {
    fontSize: 15,
    color: "#333",
    writingDirection: "rtl",
  },

  // ── Questions ──
  questionsContainer: {
    gap: 24,
  },
  questionBlock: {
    gap: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    writingDirection: "rtl",
  },

  // ── Conditional Input ──
  conditionalInput: {
    marginTop: -12,
    marginBottom: 12,
  },
  multilineInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    textAlign: "right",
  },

  // ── Bottom Button ──
  bottomSection: {
    
  
    backgroundColor: "#FAF7F2",
  },
  nextButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b3939",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: "#7D0A0A",
    shadowOpacity: 0.1,
  },
  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  nextTextDisabled: {
    color: "#e3e6ec",
  },
});
