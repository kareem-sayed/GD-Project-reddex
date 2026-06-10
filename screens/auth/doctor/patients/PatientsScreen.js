import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Alert,
  platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// API: Fetch doctor patients
import { getDoctorPatients } from "../../../../backEnd/api/services/doctorApi";

const { width } = Dimensions.get("window");

export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // مصفوفة اختبارية (Mock Data) ثابتة ومنعزلة للتطوير والاختبار والـ Fallback
  const mockPatients = [
    {
      id: "patient_stable_1",
      name: "سارة أمين (تجربة - مستقر)",
      status: "STABLE",
      age: 24,
      gender: "أنثى",
      bloodType: "+B",
      update: "منذ ساعتين",
      image: null,
    },
    {
      id: "patient_follow_2",
      name: "أحمد خالد (تجربة - متابعة)",
      status: "FOLLOW_UP",
      age: 29,
      gender: "ذكر",
      bloodType: "+AB",
      update: "منذ 5 دقائق",
      aiAlert: true,
      aiMessage: "ارتفاع معتدل في الحديد والفيريتين",
    },
    {
      id: "patient_critical_3",
      name: "عمر فاروق (تجربة - حرج)",
      status: "CRITICAL",
      age: 26,
      gender: "ذكر",
      bloodType: "+A",
      update: "الآن",
      aiAlert: true,
      aiMessage: "تنبيه: مؤشرات غير مستقرة، يرجى التدخل العاجل",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPatients = async () => {
        try {
          if (isActive) setLoading(true);
          console.log("LOG: Fetching doctor patients...");
          const res = await getDoctorPatients();

          // تأمين استخراج المصفوفة أياً كان شكل كائن الـ Response المغلف من الباك إند
          const realData = res?.data?.data?.data || res?.data?.data || res?.data || [];

          if (isActive) {
            // دمج ذكي: إذا كانت البيانات الحقيقية من السيرفر فارغة نعتمد الـ mockPatients
            setPatients(Array.isArray(realData) && realData.length > 0 ? realData : mockPatients);
          }
        } catch (error) {
          console.log("LOG: Error fetching doctor patients:", error);
          if (isActive) {
            // حتى عند حدوث خطأ شبكة، نعرض البيانات الوهمية لكي لا تتعطل شاشتكِ أثناء التطوير
            setPatients(mockPatients);
          }
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchPatients();

      return () => {
        isActive = false; // تنظيف الـ Effect لمنع تحديث الـ State بعد مغادرة الشاشة
      };
    }, [])
  );

  const handlePress = (item) => {
    const status = item.status || "مستقر";

    switch (status) {
      case "حرج":
      case "CRITICAL":
        navigation.navigate("CriticalCondition", { patient: item });
        break;
      case "يحتاج متابعة":
      case "FOLLOW_UP":
        navigation.navigate("FollowUpScreen", { patient: item });
        break;
      case "مستقر":
      case "STABLE":
        navigation.navigate("StableCondition", { patient: item });
        break;
      default:
        navigation.navigate("StableCondition", { patient: item });
        break;
    }
  };

  // تأمين الفلترة: التحقق أن المرضى مصفوفة أولاً لتفادي الـ TypeError تماماً
  const filteredPatients = Array.isArray(patients)
    ? patients.filter((p) => p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المرضى</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#641919" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Stats Section */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{patients.length}</Text>
              <Text style={styles.statLabel}>مريض حالي</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>124</Text>
              <Text style={styles.statLabel}>كل المرضى</Text>
            </View>
          </View>

          {/* Search Section */}
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionTitle}>ابحث عن مريض</Text>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#C4C4C4" />
            <TextInput
              placeholder="بحث"
              style={styles.searchInput}
              placeholderTextColor="#C4C4C4"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* List Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionTitle}>مرضى تحت المتابعة</Text>
          </View>

          {/* Patient Cards */}
          {filteredPatients.length > 0 ? (
            filteredPatients.map((item) => {
              const isCritical = item.status === "حرج" || item.status === "CRITICAL";
              const isFollowUp = item.status === "يحتاج متابعة" || item.status === "FOLLOW_UP";

              const borderColor = isCritical ? "#E63946" : isFollowUp ? "#F59F00" : "#2F9E44";
              const statusBg = isCritical ? "#FFDCE0" : isFollowUp ? "#FFF9DB" : "#D3F9D8";
              const statusText = isCritical ? "#E63946" : isFollowUp ? "#F59F00" : "#2F9E44";
              const statusLabel = isCritical ? "حرج" : isFollowUp ? "يحتاج متابعة" : "مستقر";

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => handlePress(item)}
                  style={[styles.card, { borderStartColor: borderColor }]}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.patientInfo}>
                      <View style={styles.nameRow}>
                        <View style={[styles.badge, { backgroundColor: statusBg }]}>
                          <Text style={[styles.badgeText, { color: statusText }]}>
                            {statusLabel}
                          </Text>
                        </View>
                        <Text style={styles.patientName}>{item.name}</Text>
                      </View>
                      <Text style={styles.updateText}>
                        آخر تحديث : {item.update || "منذ فترة وجيزة"}
                      </Text>
                    </View>

                    {item.image || item.photo || item.photoUrl ? (
                      <Image
                        source={{ uri: item.image || item.photo || item.photoUrl }}
                        style={styles.avatar}
                      />
                    ) : (
                      <View style={[styles.avatar, styles.fallbackAvatar]}>
                        <MaterialCommunityIcons name="account-circle-outline" size={32} color="#757575" />
                      </View>
                    )}
                  </View>

                  {/* تنبيه الذكاء الاصطناعي */}
                  {item.aiAlert && (
                    <View style={[styles.aiBox, { backgroundColor: isCritical ? "#FFF5F5" : "#FFFFF0" }]}>
                      <Ionicons name="arrow-back" size={18} color="#666" style={{ marginRight: 10 }} />
                      <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={styles.aiTitle}>تم ملاحظة تغييرات بواسطة AI</Text>
                        <Text style={[styles.aiDesc, { color: statusText }]}>
                          {item.aiMessage || "يرجى مراجعة المؤشرات الحيوية بشكل عاجل."}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.emptyText}>لا يوجد مرضى مطابقين للبحث حالياً.</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF8",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
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
    elevation: 4,
    borderBottomWidth: 0.2,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  statBox: {
    width: (width - 60) / 2,
    height: 90,
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: "#f1f1f1",
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 5,
  },
  test: {
    flexDirection: "row",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 12,
    marginTop: 5,
    color: "#1A1A1A",
  },
  searchContainer: {
    flexDirection: "row-reverse",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#EDEDED",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    marginRight: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderStartWidth: 4,
    // iOS Shadow
    shadowColor: "#3c3737",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android Shadow
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
    alignItems: "flex-Start",
  },
  nameRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 80,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  updateText: {
    fontSize: 12,
    color: "#BDBDBD",
    marginTop: 4,
  },
  aiBox: {
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
  aiDesc: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
});
