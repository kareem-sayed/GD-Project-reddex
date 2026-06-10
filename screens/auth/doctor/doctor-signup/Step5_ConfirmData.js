import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import SignupProgressBar from "../../../components/SignupProgressBar";
import { doctorSignup } from "../../../../backEnd/api/services/doctorApi";
import {
  saveToken,
  saveRole,
  removeToken,
} from "../../../../backEnd/storage/tokenStorage";
import { AuthContext } from "../../../../backEnd/context/AuthContext";

export default function Step5_Confirm({ formData, prevStep, navigation }) {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  // دالة مساعدة لتحويل التاريخ إلى الصيغة القياسية YYYY-MM-DD إذا تم إدخاله بـ سلاش (/)
  const formatBirthdate = (dateStr) => {
    if (!dateStr) return "";
    // لو التاريخ يحتوي على / نقوم بتنظيفه وترتيبه
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const day = parts[0].padStart(2, "0");
        const month = parts[1].padStart(2, "0");
        const year = parts[2];
        // إذا كان المستخدم كاتب اليوم الأول ثم الشهر (تعديل حسب ترتيب إدخالك: 7/1/2005 -> 2005-01-07)
        return `${year}-${month}-${day}`;
      }
    }
    return dateStr;
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // ─── 1. الحساب والبيانات الشخصية ───
      data.append("name", formData.fullName.trim());
      data.append("email", formData.email.trim());
      data.append("password", formData.password);

      // حل مشكلة رقم الهاتف: تحويله للصيغة الدولية E.164 تلقائياً (مثال لمصر)
      let formattedPhone = formData.phoneNumber.trim();
      if (!formattedPhone.startsWith("+")) {
        if (formattedPhone.startsWith("0")) {
          // لو بدأ بـ 0 زي 011... بنشيل الصفر ونحط +2
          formattedPhone = `+2${formattedPhone.substring(1)}`;
        } else {
          // لو كاتب الرقم عل طول بدون 0 بنحط +2
          formattedPhone = `+2${formattedPhone}`;
        }
      }
      data.append("phone", formattedPhone);
      // data.append("phone", formData.phoneNumber.trim());
      // حل مشكلة التاريخ: تحويل صيغة الـ birthdate قبل الإرسال
      data.append("birthdate", formatBirthdate(formData.birthdate));
      data.append("gender", formData.gender === "male" ? "MALE" : "FEMALE");

      // ─── 2. البيانات المهنية ───
      // حل مشكلة الرقم القومي: الباك إند يشترط 9 أرقام فقط (سنأخذ أول 9 أرقام كمثال، أو تأكدي من إدخال 9 أرقام في الـ UI)
      const cleanedSSN = formData.ssn.trim().substring(0, 9);
      data.append("SSN", cleanedSSN);
      // data.append("SSN", formData.ssn.trim());
      data.append("specialty", formData.specialization.trim());
      // data.append("yearsExperience", Number(formData.yearsOfExperience)); // الباك إند طالبه number فبنأكد تحويله
      // data.append("licenseMedicalNumber", formData.licenseNumber);
      // الباك إند مستني سنيين الخبرة رقم (Number) وليس String مائل
      const exp = parseInt(formData.yearsOfExperience, 10);
      data.append("yearsExperience", isNaN(exp) ? 0 : exp);

      data.append("licenseMedicalNumber", formData.licenseNumber.trim());

      // ─── 3. بيانات العيادة (تعديل المسميات حسب الدوكيومنت) ───
      if (formData.clinicName) {
        data.append("nameOfClinic", formData.clinicName.trim()); //تعديل حسب الدوكيومنت
      }
      if (formData.clinicAddress) {
        data.append("locationOfClinic", formData.clinicAddress.trim()); // تعديل حسب الدوكيومنت
      }
      if (formData.workingHours) {
        data.append("workingHours", formData.workingHours.trim());
      }

      // ─── 4. المرفقات والملفات (تعديل المسميات الحرج حسب الدوكيومنت) ───
      if (formData.idCard) {
        data.append("idCardPhotoUrl", {
          //التعديل اللي هيحل الـ Error 400
          uri: formData.idCard.uri,
          name: formData.idCard.name || "id_card.jpg",
          type: formData.idCard.type || "image/jpeg",
        });
      }

      if (formData.practiceLicense) {
        data.append("licenseMedicalPhotoUrl", {
          // التعديل اللي هيحل الـ Error 400
          uri: formData.practiceLicense.uri,
          name: formData.practiceLicense.name || "license.jpg",
          type: formData.practiceLicense.type || "image/jpeg",
        });
      }

      if (formData.clinicCertificate) {
        data.append("photoOfClinicUrl", {
          //  التعديل حسب الدوكيومنت
          uri: formData.clinicCertificate.uri,
          name: formData.clinicCertificate.name || "clinic.jpg",
          type: formData.clinicCertificate.type || "image/jpeg",
        });
      }

      console.log("Sending Cleaned Doctor Form Data...", JSON.stringify(data));

      const res = await doctorSignup(data);

      console.log("Doctor Signup Success:", res.data);

      const token = res.data.data.token;
      const role = res.data.data.doctor.user.role;

      console.log("TOKEN:", token);
      console.log("ROLE:", role);

      await loginUser(token, role);

      console.log("LOGIN DONE");

      navigation.navigate("signupDone");
    } catch (err) {
      console.log("Doctor Signup Error:", err);
      // طباعة تفاصيل الإيرور كاملة من السيرفر لمعرفة الحقل التالف بالضبط
      console.log("Server Error Details:", err.response?.data);
      Alert.alert(
        "خطأ في التسجيل",
        err.response?.data?.message || "حصل خطأ أثناء إنشاء الحساب.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SignupProgressBar currentStep={5} />

        <Text style={styles.title}>تأكيد البيانات</Text>

        <Text style={styles.subtitle}>
          راجع بياناتك، ولو كل حاجة تمام اضغط تأكيد.
        </Text>

        {/* البيانات الأساسية والشخصية */}
        <View style={styles.section}>
          <Text style={styles.label}>البريد الإلكتروني :</Text>
          <Text style={styles.value}>{formData.email}</Text>

          <Text style={styles.label}>رقم التليفون :</Text>
          <Text style={styles.value}>{formData.phoneNumber}</Text>

          <Text style={styles.label}>تاريخ الميلاد :</Text>
          <Text style={styles.value}>{formData.birthdate}</Text>

          <Text style={styles.label}>النوع :</Text>
          <Text style={styles.value}>
            {formData.gender === "male" ? "ذكر" : "أنثى"}
          </Text>

          <Text style={styles.label}>الاسم :</Text>
          <Text style={styles.value}>{formData.fullName}</Text>

          <Text style={styles.label}>الرقم القومي :</Text>
          <Text style={styles.value}>{formData.ssn}</Text>

          <Text style={styles.label}>التخصص الطبي :</Text>
          <Text style={styles.value}>{formData.specialization}</Text>

          <Text style={styles.label}>سنين الخبرة :</Text>
          <Text style={styles.value}>{formData.yearsOfExperience} سنوات</Text>

          <Text style={styles.label}>رقم الترخيص الطبي :</Text>
          <Text style={styles.value}>{formData.licenseNumber}</Text>
        </View>

        {/* بيانات العيادة */}
        <View style={styles.section}>
          <Text style={styles.label}>بيانات العيادة :</Text>

          <Text style={styles.value}>الاسم : {formData.clinicName}</Text>

          <Text style={styles.value}>العنوان : {formData.clinicAddress}</Text>

          <Text style={styles.value}>
            مواعيد العمل : {formData.workingHours}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          {/* زر التأكيد */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleFinalSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.nextText}>انشاء حساب</Text>
            )}
          </TouchableOpacity>

          {/* زر السابق */}
          <TouchableOpacity
            style={styles.prevButton}
            onPress={prevStep}
            disabled={loading}
          >
            <Text style={styles.prevText}>السابق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  container: {
    flex: 1,
    padding: 24,
  },

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

  section: {
    gap: 10,
    marginBottom: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  value: {
    fontSize: 14,
    color: "#666",
    textAlign: "row-reverse",
    writingDirection: "rtl",
  },

  buttons: {
    flexDirection: "column",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 24,
  },

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

  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
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

  prevText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7D0A0A",
  },
});
