import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import mainClient from "../../../..//backEnd/api/clients/mainClient";

export default function StableCondition({ navigation }) {
  const route = useRoute();
  // نستقبل المريض الممرر من شاشة المرضى السابقة
  const { patient: initialPatient } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientData, setPatientData] = useState(initialPatient || null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [currentMeds, setCurrentMeds] = useState([]);

  useEffect(() => {
    fetchScreenData();
  }, [initialPatient?.id]);

  // تحديث قائمة الأدوية فوراً لو عاد من شاشة التعديل MedicationsScreen ببيانات جديدة
  useEffect(() => {
    if (route.params?.updatedMeds) {
      setCurrentMeds(route.params.updatedMeds);
    }
  }, [route.params?.updatedMeds]);

  const fetchScreenData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. تأمين جلب الـ IDs بشكل مرن جداً
      const targetPatientId = initialPatient?.id;
      const targetUserId = initialPatient?.userId;

      // إذا لم يكن هناك أي معرف للمريض، نكتفي بعرض البيانات الممررة ولا نوقف الشاشة بأيرور
      if (!targetPatientId) {
        console.log("تنبيه: يتم عرض بيانات مريض تجريبية أو ناقصة الـ ID");
        if (initialPatient) {
          setPatientData(initialPatient);
        }
        setAiAnalysis("لا يوجد تحليل ذكاء اصطناعي متاح للحسابات التجريبية.");
        setCurrentMeds([]);
        setLoading(false);
        return;
      }

      console.log("PATIENT ID:", targetPatientId);
      console.log("USER ID:", targetUserId);

      // 2. جلب البيانات بالتوازي مع حماية كاملة لو تعطل أي API
      const [aiResponse, prescriptionResponse] = await Promise.all([
        mainClient.get(`/results/patient/${targetUserId}`).catch((err) => {
          console.log("AI Results Error:", err.message);
          return { data: { data: [] } };
        }),
        mainClient
          .get(`/prescriptions/patient/${targetPatientId}`)
          .catch((err) => {
            console.log("Prescriptions Error:", err.message);
            return { data: { data: [] } };
          }),
      ]);

      // 3. تحديث بيانات المريض الأساسية
      if (initialPatient) {
        setPatientData(initialPatient);
      }

      // 4. معالجة بيانات الذكاء الاصطناعي بأمان
      const aiResults = aiResponse?.data?.data || [];
      if (aiResults.length > 0) {
        const latestResult = aiResults[0];
        setAiAnalysis(
          latestResult?.result?.final_report ||
            latestResult?.result?.disease_type ||
            "لا يوجد تحليل متاح حالياً.",
        );
      } else {
        setAiAnalysis("لا يوجد تحليل ذكاء اصطناعي متاح حالياً لهذا المريض.");
      }

      // 5. معالجة قائمة الأدوية بأمان
      const medsData = prescriptionResponse?.data?.data || [];
      const formattedMeds = medsData.map((med, index) => ({
        id: med.id?.toString() || index.toString(),
        name: med.medicationName || med.name || "دواء غير مسمى",
        dose: med.dose || med.instructions || "حسب إرشادات الطبيب",
      }));
      setCurrentMeds(formattedMeds);
    } catch (err) {
      console.log("Error fetching patient details screen data:", err);
      setError("حدث خطأ أثناء تحميل تفاصيل المريض. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#641919" />
        <Text style={{ marginTop: 10, color: "#666" }}>
          جاري تحميل البيانات...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          },
        ]}
      >
        <Text
          style={{
            color: "#D32F2F",
            textAlign: "center",
            fontSize: 16,
            marginBottom: 20,
          }}
        >
          {error}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "#641919", padding: 12, borderRadius: 8 }}
          onPress={fetchScreenData}
        >
          <Text style={{ color: "#FFF", fontWeight: "bold" }}>
            إعادة المحاولة
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // استخراج تفاصيل الصورة والبيانات الأساسية بشكل آمن لمنع ظهور "مريض غير معروف"

  const user = patientData?.user || {};

  const displayName = patientData?.name ?? user?.name ?? "مريض غير معروف";
  const displayAge = patientData?.age ?? user?.age ?? "--";
  const displayGender =
    patientData?.gender ??
    (user?.gender === "FEMALE" ? "أنثى" : "ذكر") ??
    "غير محدد";

  const displayBlood = patientData?.bloodType ?? "--";

  const displayImage = user?.photourl ?? null;

  console.log("PATIENT DATA");
  console.log(JSON.stringify(patientData, null, 2));

  console.log("DISPLAY IMAGE");
  console.log(displayImage);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المرضى</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Patient Profile */}
        <View style={styles.patientProfile}>
          {displayImage ? (
            <Image source={{ uri: displayImage }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={32}
                color="#757575"
              />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={styles.patientName}>{displayName}</Text>
            <Text style={styles.patientSubInfo}>
              {displayAge} سنة | {displayGender} | فصيلة الدم : {displayBlood}
            </Text>
          </View>
        </View>

        <View style={styles.stableAlertBox}>
          <Text style={styles.stableAlertText}>الحالة مستقرة</Text>
        </View>

        {/* AI Analysis Section */}
        <Text style={styles.sectionTitle}>تحليل الذكاء الاصطناعي</Text>
        <View style={styles.aiContainer}>
          <View style={styles.aiIconCircle}>
            <Ionicons name="sparkles" size={18} color="#333" />
          </View>
          <Text style={styles.aiText}>{aiAnalysis}</Text>
        </View>

        {/* Medications Section */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicationsScreen", {
                initialMeds: currentMeds,
                targetScreen: "StableCondition",
                patientId: patientData?.id,
                patient: patientData,
              })
            }
          >
            <Text style={styles.editBtn}>تعديل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>الأدوية</Text>
        </View>

        <View style={styles.medicationList}>
          {currentMeds.length > 0 ? (
            currentMeds.map((med) => (
              <View key={med.id} style={styles.medItem}>
                <Text style={styles.medTime}>{med.dose}</Text>
                <Text style={styles.medName}>{med.name}</Text>
              </View>
            ))
          ) : (
            <View style={{ paddingVertical: 15, alignItems: "center" }}>
              <Text style={{ color: "#999", fontSize: 14 }}>
                لا توجد أدوية مسجلة حالياً لهذا المريض.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 0.2,
    borderBottomColor: "#EEE",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 80 },
  patientProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 35, marginRight: 15 },
  profileText: { alignItems: "flex-start" },
  patientName: { fontSize: 22, fontWeight: "bold", color: "#333" },
  patientSubInfo: { fontSize: 14, color: "#888", marginTop: 4 },
  stableAlertBox: {
    backgroundColor: "#D3F9D8",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B2F2BB",
    flexDirection: "row",
  },
  stableAlertText: { color: "#2b853b", fontWeight: "bold", fontSize: 16 },
  sectionTitle: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  aiContainer: { backgroundColor: "#F9F5EB", borderRadius: 20, padding: 15 },
  aiIconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#FDECCD",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  aiText: {
    textAlign: "left",
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  editBtn: {
    color: "#641919",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    padding: 5,
  },
  medicationList: { marginTop: 10, backgroundColor: "#FFFFFF" },
  medItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderColor: "#EEE",
  },
  medName: { fontSize: 16, color: "#333", fontWeight: "500" },
  medTime: { fontSize: 13, color: "#AAA" },
});
