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

const FollowUpScreen = ({ navigation }) => {
  const route = useRoute();

  // 1.state default to current meds (or some dummy data)
  const [currentMeds, setCurrentMeds] = useState([
    { id: "1", name: "Rocaltrol", dose: "مرة يومياً" },
    { id: "2", name: "Ferrous Sulfate 200 mg", dose: "مرة يومياً" },
    { id: "3", name: "Folic Acid 5 mg", dose: "مرة يومياً" },
  ]);

  // 2. useEffect to update meds when coming back from MedicationsScreen
  useEffect(() => {
    if (route.params?.updatedMeds) {
      setCurrentMeds(route.params.updatedMeds);
    }
  }, [route.params?.updatedMeds]);
  // vitals data (could also come from route params or API in real app)
  const vitals = [
    {
      id: "1",
      label: "الحديد",
      value: "180",
      unit: "ug/dL",
      status: "مرتفع",
      color: "#F59F00",
      trend: "trending-up",
      bg: "#FFF9DB",
    },
    {
      id: "2",
      label: "الفيريتين",
      value: "400",
      unit: "ng/mL",
      status: "مرتفع",
      color: "#F59F00",
      trend: "trending-up",
      bg: "#FFF9DB",
    },
    {
      id: "3",
      label: "الهيموجلوبين",
      value: "11.5",
      unit: "g/dL",
      status: "منخفض قليلاً",
      color: "#F59F00",
      trend: "trending-down",
      bg: "#FFF9DB",
    },
    {
      id: "4",
      label: "ك. الدم البيضاء",
      value: "11.0",
      unit: "x10^9/L",
      status: "مرتفع قليلاً",
      color: "#F59F00",
      trend: "trending-up",
      bg: "#FFF9DB",
    },
    {
      id: "5",
      label: "الصفائح الدموية",
      value: "240",
      unit: "x10^3/uL",
      status: "طبيعي",
      color: "#2F9E44",
      // trend: "remove",
      bg: "#F6FFF8",
    },
    {
      id: "6",
      label: "ك. الدم الحمراء",
      value: "4.6",
      unit: "x10^6/uL",
      status: "طبيعي",
      color: "#2F9E44",
      // trend: "remove",
      bg: "#F6FFF8",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={24} color="#641919" />
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
            source={{ uri: "https://i.pravatar.cc/150?u=ahmed" }}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.patientName}>أحمد خالد</Text>
            <Text style={styles.patientSubInfo}>
              29 سنة | ذكر | فصيلة الدم : +AB
            </Text>
          </View>
        </View>

        {/* Yellow Alert Box */}
        <View style={styles.followUpAlertBox}>
          <Text style={styles.alertTitle}>تنبيه طبي</Text>
          <Text style={styles.alertDesc}>
            ارتفاع معتدل في الحديد والفيريتين مع انخفاض بسيط في الهيموجلوبين.
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
              style={[styles.vitalCard, { borderStartColor: item.color }]}
            >
              <View style={styles.vitalHeader}>
                {item.trend !== "remove" && (
                  <Ionicons name={item.trend} size={16} color={item.color} />
                )}
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

        {/* AI Analysis (Yellow Content) */}
        <Text style={styles.sectionTitle}>تحليل الذكاء الاصطناعي</Text>
        <View style={styles.aiContainer}>
          <View style={styles.aiIconCircle}>
            <Ionicons name="sparkles" size={18} color="#333" />
          </View>
          <Text style={styles.aiText}>
            تحليل الدم الحالي يشير إلى أن مستويات الحديد ومخزون الفيريتين
            مرتفعان قليلاً، مما يعني وجود تراكم بسيط للحديد في الجسم يحتاج
            متابعة دورية ومراقبة النظام الغذائي... الحالة ليست حرجة لكنها تحتاج
            مراقبة.
          </Text>
        </View>
        {/* Medications Section */}
        <View style={styles.sectionHeaderRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicationsScreen", {
                initialMeds: currentMeds,
                targetScreen: "FollowUpScreen", 
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
      </ScrollView>
    </SafeAreaView>
  );
};

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
  followUpAlertBox: {
    backgroundColor: "#FFFBE6",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FFE58F",
  },
  alertTitle: {
    textAlign: "left",
    fontWeight: "bold",
    color: "#F59F00",
    fontSize: 16,
  },
  alertDesc: {
    textAlign: "left",
    color: "#856404",
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
    backgroundColor: "#FCFCFC",
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
  vitalValue: { fontSize: 22, fontWeight: "bold" },
  vitalUnit: { fontSize: 12, color: "#AAA", marginRight: 5 },
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
    fontSize: 14,
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
  medTime: { fontSize: 12, color: "#AAA" },
});

export default FollowUpScreen;
