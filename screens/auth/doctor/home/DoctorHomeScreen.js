import React from "react";
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

export default function DoctorHomeScreen({ navigation }) {
  // كارد الإحصائيات العلوية
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

  // كارد المريض في قائمة المتابعة
  const PatientItem = ({ name, condition, image }) => (
    <View style={styles.patientCard}>
      <View style={styles.patientInfo}>
        <Image source={image} style={styles.patientAvatar} />
        <View style={{ alignItems: "flex-end", marginRight: 12 }}>
          <Text style={styles.patientName}>{name}</Text>
          <Text style={styles.patientCondition}>{condition}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="person-add-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
  const Header = () => (
    <View style={styles.header}>
      {/* الشمال: الجرس */}
      <TouchableOpacity
        style={styles.bellContainer}
        onPress={() => navigation.navigate("NotificationsScreen")}
      >
        <Ionicons name="notifications-outline" size={22} color="#000" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </TouchableOpacity>

      {/* اليمين: اسم الدكتور + الصورة */}
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
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      > */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
      >
        <Header />
        {/* قسم الإحصائيات */}
        <View style={styles.statsRow}>
          <StatCard count="3" label="مستقر" color="green" />
          <StatCard count="1" label="يحتاج متابعة" color="yellow" />
          <StatCard count="1" label="حرِج" color="red" />
        </View>

        {/* عنوان قسم طلبات المتابعة */}
        <View style={styles.sectionHeader}>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>جميع الطلبات</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>طلبات متابعة</Text>
        </View>

        {/* قائمة المرضى (Static) */}
        <View style={styles.listContainer}>
          <PatientItem
            name="أحمد خالد"
            condition="أنيميا البحر المتوسط"
            image={require("../../../../assets/images/profile/patient1.png")} // غيري المسار للمسار الصحيح عندك
          />
          <PatientItem
            name="سارة وائل"
            condition="حمى البحر المتوسط"
            image={require("../../../../assets/images/profile/patient1.png")}
          />
          <PatientItem
            name="متولي عبد الخالق"
            condition="لوكيميا"
            image={require("../../../../assets/images/profile/patient1.png")}
          />
        </View>

        {/* قسم حالات ذات أولوية */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>حالات ذات أولوية</Text>
        </View>

        {/* كارد الحالة الطارئة (عمر فاروق) */}
        <View style={styles.priorityCard}>
          <View style={styles.priorityHeader}>
            <View style={styles.priorityTag}>
              <Text style={styles.priorityTagText}>يحتاج متابعة</Text>
            </View>
            <View style={styles.priorityInfo}>
              <View style={{ alignItems: "flex-end", marginRight: 10 }}>
                <Text style={styles.patientName}>عمر فاروق</Text>
                <Text style={styles.lastUpdate}>آخر تحديث : منذ ساعتين</Text>
              </View>
              <Image
                source={require("../../../../assets/images/profile/patient1.png")}
                style={styles.patientAvatar}
              />
            </View>
          </View>

          {/* تنبيه الـ AI */}
          <TouchableOpacity style={styles.aiAlertBox}>
            <Ionicons name="chevron-back" size={18} color="#B00B0B" />
            <View style={{ alignItems: "flex-end" }}>
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
    // paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 15 : 5,
    marginBottom: 15,
    backgroundColor: "#fff", // مهم جدًا عشان الظل يبان

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    // Android shadow
    elevation: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  greeting: {
    fontSize: 16,
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
    borderRadius: 10,
    elevation: 2,
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeAllText: {
    fontSize: 14,
    color: "#784847",
    textDecorationLine: "underline",
  },
  listContainer: {
    gap: 12,
  },
  patientCard: {
    flexDirection: "row",
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
    borderRightWidth: 4,
    borderRightColor: "#B00B0B",
    elevation: 3,
    marginBottom: 20,
  },
  priorityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  priorityTag: {
    backgroundColor: "#FFE5E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityTagText: {
    color: "#B00B0B",
    fontSize: 11,
    fontWeight: "bold",
  },
  priorityInfo: {
    flexDirection: "row",
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
    flexDirection: "row",
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
