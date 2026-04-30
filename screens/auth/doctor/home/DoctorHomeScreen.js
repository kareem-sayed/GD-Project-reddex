import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DoctorHomeScreen({ navigation }) {
  // 1. partient requests - static data for now
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "1",
      name: "أحمد خالد",
      condition: "أنيميا البحر المتوسط",
      image: require("../../../../assets/images/profile/patient1.png"),
    },
    {
      id: "2",
      name: "سارة وائل",
      condition: "حمى البحر المتوسط",
      image: require("../../../../assets/images/profile/patient1.png"),
    },
    {
      id: "3",
      name: "متولي عبد الخالق",
      condition: "لوكيميا",
      image: require("../../../../assets/images/profile/patient1.png"),
    },
    {
      id: "4",
      name: "يوسف علي",
      condition: "لوكيميا",
      image: require("../../../../assets/images/profile/patient1.png"),
    },
  ]);

  // add patient to follow up list
  const handleAddPatient = (id) => {
    setPendingRequests((prev) => prev.filter((p) => p.id !== id));
    // api call to accept the request would go here
    alert("تم قبول طلب المتابعة بنجاح");
  };
  // stat card component
  const StatCard = ({ count, label, color }) => (
    <View style={styles.statCard}>
      <Text
        style={[
          styles.statCount,
          {
            color:
              color === "green"
                ? "#2D6A4F"
                : color === "yellow"
                  ? "#A89E11"
                  : "#B00B0B",
          },
        ]}
      >
        {count}
      </Text>
      <Text
        style={[
          styles.statLabel,
          {
            color:
              color === "green"
                ? "#2D6A4F"
                : color === "yellow"
                  ? "#A89E11"
                  : "#B00B0B",
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );

  // patient item component
  const PatientItem = ({ item }) => (
    <View style={styles.patientCard}>
      {/* Icon to add patient */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddPatient(item.id)}
      >
        <MaterialCommunityIcons
          name="account-check-outline"
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.patientInfo}>
        <Image source={item.image} style={styles.patientAvatar} />
        <View style={{ marginLeft: 10, alignItems: "flex-start" }}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientCondition}>{item.condition}</Text>
        </View>
      </View>
    </View>
  );
  const Header = () => (
    <View style={styles.header}>
      {/* bell icon */}
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => navigation.navigate("NotificationsScreen")}
      >
        <Ionicons name="notifications-outline" size={22} color="#000" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </TouchableOpacity>

      {/* doctor info + image */}
      <View style={styles.headerRight}>
        <Image
          source={require("../../../../assets/images/profile/patient1.png")}
          style={styles.doctorImage}
        />
        <Text style={styles.greeting}>أهلاً، د. عادل</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFCF8" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        // contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
      >
        <Header />
        {/* Stats cards section */}
        <View style={styles.statsRow}>
          <StatCard count="3" label="مستقر" color="green" />
          <StatCard count="1" label="يحتاج متابعة" color="yellow" />
          <StatCard count="1" label="حرِج" color="red" />
        </View>

        {/* Section header for follow-up requests */}
        <View style={styles.sectionHeader1}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AllRequestsScreen", {
                requests: pendingRequests,
              })
            }
          >
            <Text style={styles.seeAllText}>جميع الطلبات</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>طلبات متابعة</Text>
        </View>

        {/* patient list */}
        <View style={styles.listContainer}>
          {pendingRequests.length > 0 ? (
            pendingRequests
              .slice(0, 3)
              .map((item) => <PatientItem key={item.id} item={item} />)
          ) : (
            <Text style={{ textAlign: "center", color: "#999", marginTop: 10 }}>
              لا توجد طلبات معلقة حالياً
            </Text>
          )}
        </View>

        {/* Priority cases section */}
        <View
          style={[styles.sectionHeader2, { alignItems: "row", marginTop: 20 }]}
        >
          <Text style={styles.sectionTitle}>حالات ذات أولوية</Text>
        </View>

        {/* priority card */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityHeader}>
            <View style={styles.priorityTag}>
              <Text style={styles.priorityTagText}>يحتاج متابعة</Text>
            </View>
            <View style={styles.priorityInfo}>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.patientName}>عمر فاروق</Text>
                <Text style={styles.lastUpdate}>آخر تحديث : منذ ساعتين</Text>
              </View>
              <Image
                source={require("../../../../assets/images/profile/patient1.png")}
                style={styles.patientAvatar}
              />
            </View>
          </View>

          {/* AI alert */}
          <TouchableOpacity style={styles.aiAlertBox}>
            <Ionicons name="chevron-back" size={18} color="#B00B0B" />
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.aiTitle}>تم ملاحظة تغييرات بواسطة AI</Text>
              <Text style={styles.aiSubText}>
                ارتفاع ملحوظ في نسبة الحديد ومخزون الفيريتين
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF8",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
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
    elevation: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: "#EEE",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  doctorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  bellContainer: {
    position: "relative",
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 11,
    elevation: 2,
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -1,
    backgroundColor: "#B00B0B",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 25,
  },
  statCard: {
    width: "30%",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  sectionHeader1: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionHeader2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    textAlign: "row-reverse",
    writingDirection: "rtl",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeAllText: {
    fontSize: 14,
    color: "#7D0A0A",
    textDecorationLine: "underline",
  },
  listContainer: {
    gap: 12,
  },
  patientCard: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 15,
    elevation: 1,
  },
  patientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  patientAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  patientCondition: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#631515",
    padding: 10,
    borderRadius: 10,
  },
  priorityCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#B00B0B",
    // elevation: 1,
    marginBottom: 20,
  },
  priorityHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  priorityTag: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    // flexDirection: "row-reverse",
    // alignItems: "flex-start",
  },
  priorityTagText: {
    color: "#B00B0B",
    fontSize: 11,
    fontWeight: "bold",
  },
  priorityInfo: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  lastUpdate: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  aiAlertBox: {
    backgroundColor: "#FFE5E5",
    marginTop: 15,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  aiSubText: {
    fontSize: 11,
    color: "#B00B0B",
    marginTop: 2,
  },
});
