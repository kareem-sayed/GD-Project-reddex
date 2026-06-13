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

export default function CriticalCondition({ navigation }) {
  const route = useRoute();
  // استقبال المريض الممرر من شاشة المرضى السابقة
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
      const targetUserId =
        initialPatient?.userId ||
        initialPatient?.user?.id ||
        initialPatient?.id;

      // إذا لم يكن هناك أي معرف للمريض (بيانات تجريبية يدوية)
      if (!targetPatientId) {
        console.log("تنبيه: يتم عرض بيانات مريض حرجة تجريبية أو ناقصة الـ ID");
        if (initialPatient) {
          setPatientData(initialPatient);
        }
        setAiAnalysis("لا يوجد تحليل ذكاء اصطناعي متاح للحسابات التجريبية.");
        setCurrentMeds([
          { id: "1", name: "Rocaltrol", dose: "مرة يومياً" },
          { id: "2", name: "Ferrous Sulfate 200 mg", dose: "مرة يومياً" },
          { id: "3", name: "Folic Acid 5 mg", dose: "مرة يومياً" },
        ]);
        setLoading(false);
        return;
      }

      console.log("CRITICAL PATIENT ID:", targetPatientId);
      console.log("CRITICAL USER ID:", targetUserId);

      // 2. جلب البيانات بالتوازي مع حماية كاملة لو تعطل أي API
      const [aiResponse, prescriptionResponse] = await Promise.all([
        mainClient.get(`/results/patient/${targetUserId}`).catch((err) => {
          console.log("AI Results Error (Critical):", err.message);
          return { data: { data: [] } };
        }),
        mainClient
          .get(`/prescriptions/patient/${targetPatientId}`)
          .catch((err) => {
            console.log("Prescriptions Error (Critical):", err.message);
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

      // 5. معالجة قائمة الأدوية بأمان من السيرفر
      const medsData = prescriptionResponse?.data?.data || [];
      if (medsData.length > 0) {
        const formattedMeds = medsData.map((med, index) => ({
          id: med.id?.toString() || index.toString(),
          name: med.medicineName || med.name || "دواء غير مسمى",
          dose: med.dose || med.instructions || "حسب إرشادات الطبيب",
        }));
        setCurrentMeds(formattedMeds);
      } else {
        // Fallback في حال لا يوجد أدوية بالسيرفر للمريض الحقيقي
        setCurrentMeds([]);
      }
    } catch (err) {
      console.log("Error fetching critical patient details screen data:", err);
      setError(
        "حدث خطأ أثناء تحميل تفاصيل المريض الحرج. يرجى المحاولة لاحقاً.",
      );
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
          جاري تحميل البيانات الحرجية...
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

  // استخراج تفاصيل الصورة والبيانات الأساسية بشكل آمن لمنع الـ Undefined والانهيار
  const patientUser = patientData?.user || {};
  const displayName =
    patientData?.name || patientUser?.name || "مريض غير معروف";
  const displayAge = patientData?.age || patientUser?.age || "--";
  const displayGender =
    patientData?.gender ||
    (patientUser?.gender === "FEMALE" ? "أنثى" : "ذكر") ||
    "غير محدد";
  const displayBlood = patientData?.bloodType || "--";
  const displayImage =
    patientData?.image ||
    patientData?.photo ||
    patientData?.photoUrl ||
    patientUser?.photourl;

  // المؤشرات الحيوية الثابتة للعرض (ويمكن مستقبلاً ربطها بـ API إذا توفر)
  const vitals = [
    {
      id: "1",
      label: "الحديد",
      value: "220",
      unit: "ug/dL",
      status: "مرتفع جداً",
      color: "#E63946",
      trend: "trending-up",
      bg: "#FFF5F5",
    },
    {
      id: "2",
      label: "الفيريتين",
      value: "550",
      unit: "ng/mL",
      status: "مرتفع جداً",
      color: "#E63946",
      trend: "trending-up",
      bg: "#FFF5F5",
    },
    {
      id: "3",
      label: "الهيموجلوبين",
      value: "9.0",
      unit: "g/dL",
      status: "منخفض",
      color: "#F59F00",
      trend: "trending-down",
      bg: "#FFFFF0",
    },
    {
      id: "4",
      label: "ك. الدم البيضاء",
      value: "14.0",
      unit: "x10^9/L",
      status: "مرتفع",
      color: "#F59F00",
      trend: "trending-up",
      bg: "#FFFFF0",
    },
    {
      id: "5",
      label: "الصفائح الدموية",
      value: "200",
      unit: "x10^3/uL",
      status: "طبيعي",
      color: "#2F9E44",
      trend: "remove",
      bg: "#F6FFF8",
    },
    {
      id: "6",
      label: "ك. الدم الحمراء",
      value: "4.5",
      unit: "x10^6/uL",
      status: "طبيعي",
      color: "#2F9E44",
      trend: "remove",
      bg: "#F6FFF8",
    },
  ];

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

        {/* Critical Alert Box */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>تنبيه طبي</Text>
          <Text style={styles.alertDesc}>
            ارتفاع ملحوظ في مخزون الحديد مع مؤشرات غير مستقرة تستدعي تدخلاً
            علاجياً سريعاً ومتابعة دقيقة.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>الحالة الصحية</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>أنيميا</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>حمى البحر المتوسط</Text>
          </View>
        </View>

        {/* Vitals Section */}
        <Text style={styles.sectionTitle}>المؤشرات الحيوية</Text>
        <View style={styles.vitalsGrid}>
          {vitals.map((item) => (
            <View
              key={item.id}
              style={[
                styles.vitalCard,
                { borderStartColor: item.color, backgroundColor: "#FCFCFC" },
              ]}
            >
              <View style={styles.vitalHeader}>
                <Ionicons name={item.trend} size={16} color={item.color} />
                <Text style={styles.vitalLabel}>{item.label}</Text>
              </View>
              <View style={styles.vitalValueRow}>
                <Text style={styles.vitalValue}>{item.value}</Text>
                <Text style={styles.vitalUnit}>{item.unit}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.bg }]}>
                <Text style={[styles.statusText, { color: item.color }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
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
                targetScreen: "CriticalCondition",
                patientId: patientData?.id,
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

        {/* Test History Section */}
        <Text style={styles.sectionTitle}>سجل التحاليل</Text>
        <View style={styles.testList}>
          <View style={styles.testItem}>
            <Text style={styles.testDate}>15 أكتوبر</Text>
            <Text style={styles.testName}>CBC</Text>
          </View>
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
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#000" },
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
  alertBox: {
    backgroundColor: "#FFEBEE",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  alertTitle: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#5f191f",
    fontSize: 18,
  },
  alertDesc: {
    textAlign: "left",
    color: "#E63946",
    fontSize: 13,
    marginTop: 5,
    lineHeight: 20,
  },
  sectionTitle: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  tagRow: { flexDirection: "row", flexWrap: "wrap" },
  tag: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  tagText: { color: "#888", fontSize: 14, fontWeight: "600" },
  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  vitalCard: {
    width: "48%",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
    borderStartWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  vitalHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vitalLabel: { fontSize: 14, color: "#666", fontWeight: "600" },
  vitalValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
    gap: 10,
  },
  vitalValue: { fontSize: 22, fontWeight: "bold", color: "#333" },
  vitalUnit: { fontSize: 12, color: "#a09f9f", marginRight: 5 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 11, fontWeight: "bold" },
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
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  editBtn: {
    color: "#7d2d2d",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    padding: 5,
  },
  medicationList: { marginTop: 10, backgroundColor: "#FFFFFF" },
  medItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderColor: "#EEE",
  },
  medName: { fontSize: 16, color: "#333", fontWeight: "500" },
  medTime: { fontSize: 13, color: "#AAA" },
  testList: { marginTop: 5, backgroundColor: "#FFFFFF" },
  testItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderColor: "#EEE",
  },
  testName: { fontSize: 15, color: "#333", fontWeight: "500" },
  testDate: { fontSize: 13, color: "#AAA" },
});
