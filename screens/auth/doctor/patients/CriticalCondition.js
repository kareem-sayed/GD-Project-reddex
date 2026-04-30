import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

const CriticalCondition = ({ navigation }) => {
  // بيانات المؤشرات الحيوية
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
  const route = useRoute();
  const [currentMeds, setCurrentMeds] = useState([
    { id: "1", name: "Rocaltrol", dose: "مرة يومياً" },
    { id: "2", name: "Ferrous Sulfate 200 mg", dose: "مرة يومياً" },
    { id: "3", name: "Folic Acid 5 mg", dose: "مرة يومياً" },
  ]);
  useEffect(() => {
    if (route.params?.updatedMeds) {
      setCurrentMeds(route.params.updatedMeds);
    }
  }, [route.params?.updatedMeds]);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المرضى</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Patient Info Card */}
        <View style={styles.patientProfile}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=omar" }}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.patientName}>عمر فاروق</Text>
            <Text style={styles.patientSubInfo}>
              26 سنة | ذكر | فصيلة الدم : +A
            </Text>
          </View>
        </View>

        {/* Medical Alert */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>تنبيه طبي</Text>
          <Text style={styles.alertDesc}>
            ارتفاع ملحوظ في مخزون الحديد مع مؤشرات غير مستقرة تستدعي تدخلاً
            علاجياً سريعاً ومتابعة دقيقة.
          </Text>
        </View>

        {/* Health Status Tags */}
        <Text style={styles.sectionTitle}>الحالة الصحية</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>أنيميا</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>حمى البحر المتوسط</Text>
          </View>
        </View>

        {/* Vitals Grid */}
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

        {/* AI Analysis */}
        <Text style={styles.sectionTitle}>تحليل الذكاء الاصطناعي</Text>
        <View style={styles.aiContainer}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconCircle}>
              <Ionicons name="sparkles" size={18} color="#333" />
            </View>
          </View>
          <Text style={styles.aiText}>
            التحاليل تشير إلى أن مستويات الحديد ومخزون الفيريتين مرتفعة جداً،
            مما يعني وجود تراكم للحديد في الجسم يحتاج تدخل طبي سريع لتجنب أي
            مضاعفات مستقبلية على الكبد والكلى...
          </Text>
        </View>

        {/* Medications Section */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicationsScreen", {
                initialMeds: currentMeds,
                onGoBack: (updatedMeds) => {
                  setCurrentMeds(updatedMeds);
                },
              })
            }
          >
            <Text style={styles.editBtn}>تعديل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>الأدوية</Text>
        </View>

        <View style={styles.medicationList}>
          {/* نستخدم المصفوفة الجديدة هنا أيضاً بدلاً من النص الثابت */}
          {currentMeds.map((med) => (
            <View key={med.id} style={styles.medItem}>
              <Text style={styles.medTime}>{med.dose}</Text>
              <Text style={styles.medName}>{med.name}</Text>
            </View>
          ))}
        </View>

        {/* Test Records */}
        <Text style={styles.sectionTitle}>سجل التحاليل</Text>
        <View style={styles.testList}>
          <View style={styles.testItem}>
            <Text style={styles.testDate}>15 أكتوبر</Text>
            <Text style={styles.testName}>CBC</Text>
          </View>
          <View style={styles.testItem}>
            <Text style={styles.testDate}>22 سبتمبر</Text>
            <Text style={styles.testName}>Iron Panel / Serum Iron</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CriticalCondition;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android
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
    // elevation: 1,
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
