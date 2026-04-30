import React, { useState, useEffect } from "react";
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

const StableCondition = ({ navigation }) => {
  const route = useRoute();

  // 1. تعريف حالة الأدوية (State) مع بيانات افتراضية
  const [currentMeds, setCurrentMeds] = useState([
    { id: "1", name: "Multi-Vitamin", dose: "مرة يومياً" },
    { id: "2", name: "Omega 3", dose: "مرة يومياً" },
  ]);
  // 2. استقبال البيانات المحدثة من صفحة MedicationsScreen
  useEffect(() => {
    if (route.params?.updatedMeds) {
      setCurrentMeds(route.params.updatedMeds);
    }
  }, [route.params?.updatedMeds]);
  // بيانات المؤشرات الطبيعية (أخضر)
  const vitals = [
    {
      id: "1",
      label: "الحديد",
      value: "85",
      unit: "ug/dL",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
      trend: "remove",
    },
    {
      id: "2",
      label: "الفيريتين",
      value: "80",
      unit: "ng/mL",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
      // trend: "remove",
    },
    {
      id: "3",
      label: "الهيموجلوبين",
      value: "14",
      unit: "g/dL",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
    },
    {
      id: "4",
      label: "ك. الدم البيضاء",
      value: "6.5",
      unit: "x10^9/L",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
    },
    {
      id: "5",
      label: "الصفائح الدموية",
      value: "250",
      unit: "x10^3/uL",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
    },
    {
      id: "6",
      label: "ك. الدم الحمراء",
      value: "5.0",
      unit: "x10^6/uL",
      status: "طبيعي",
      color: "#2F9E44",
      bg: "#F6FFF8",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=sara" }}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.patientName}>سارة أمين</Text>
            <Text style={styles.patientSubInfo}>
              24 سنة | أنثى | فصيلة الدم : +B
            </Text>
          </View>
        </View>

        {/* Stable Status Badge */}
        <View style={styles.stableAlertBox}>
          <Text style={styles.stableAlertText}>الحالة مستقرة</Text>
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
              style={[styles.vitalCard, { borderStartColor: item.color }]}
            >
              <Text style={styles.vitalLabel}>{item.label}</Text>
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

        {/* AI Analysis (Green Content) */}
        <Text style={styles.sectionTitle}>تحليل الذكاء الاصطناعي</Text>
        <View style={styles.aiContainer}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconCircle}>
              <Ionicons name="sparkles" size={18} color="#333" />
            </View>
          </View>
          <Text style={styles.aiText}>
            تحليل الدم يظهر أن جميع المؤشرات ضمن المستويات الطبيعية، بما في ذلك
            الحديد ومخزون الفيريتين... مما يعكس وظائف دمية مستقرة ونظام مناعي
            صحي. الحالة مستقرة تماماً.
          </Text>
        </View>
        {/* Medications Section - الجزء اللي عدلناه */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicationsScreen", {
                initialMeds: currentMeds,
                targetScreen: "StableCondition", // نمرر اسم الشاشة عشان نرجع لها
              })
            }
          >
            <Text style={styles.editBtn}>تعديل</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>الأدوية</Text>
        </View>

        <View style={styles.medicationList}>
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
            <Text style={styles.testDate}>10 مارس</Text>
            <Text style={styles.testName}>CBC</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderStartWidth: 4,
    backgroundColor: "#FCFCFC",
    // elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
  },
  vitalLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  vitalValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
    gap: 10,
  },
  vitalValue: { fontSize: 22, fontWeight: "bold" },
  vitalUnit: { fontSize: 10, color: "#AAA", marginRight: 5 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: "bold" },
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
  testList: { marginTop: 5 },
  testItem: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  testName: { fontSize: 16, color: "#333", fontWeight: "500" },
  testDate: { fontSize: 13, color: "#AAA" },
});

export default StableCondition;
