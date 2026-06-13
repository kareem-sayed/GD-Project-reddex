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
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";

// API: Fetch doctor patients
import {
  getDoctorPatients,
  getFollowUpPatients,
} from "../../../../backEnd/api/services/doctorApi";

const { width } = Dimensions.get("window");

export default function PatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [followUpPatients, setFollowUpPatients] = useState([]);
  const [followUpLoading, setFollowUpLoading] = useState(true);
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
      aiMessage: "تنبيه: مؤشارات غير مستقرة، يرجى التدخل العاجل",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPatients = async () => {
        try {
          if (isActive) {
            setLoading(true);
            setFollowUpLoading(true);
          }
          console.log(
            "LOG: Fetching doctor patients and follow-up patients...",
          );

          // Execute requests simultaneously
          const [res, resFollowUp] = await Promise.all([
            getDoctorPatients().catch((err) => {
              console.log("ERR: main API", err);
              return null;
            }),
            getFollowUpPatients().catch((err) => {
              console.log("ERR: follow-up API", err);
              return null;
            }),
          ]);

          if (isActive) {
            // Context mapping for normal patients list
            if (res) {
              const realData =
                res?.data?.data?.data || res?.data?.data || res?.data || [];

              setPatients(
                Array.isArray(realData) && realData.length > 0
                  ? realData
                  : mockPatients,
              );
            } else {
              setPatients(mockPatients);
            }

            // Context mapping and fallbacks for follow up patients list
            if (resFollowUp) {
              const followUpData =
                resFollowUp?.data?.data?.data ||
                resFollowUp?.data?.data ||
                resFollowUp?.data ||
                [];
              setFollowUpPatients(
                Array.isArray(followUpData) ? followUpData : [],
              );
            } else {
              setFollowUpPatients([]);
            }
          }
        } catch (error) {
          console.log("LOG: Error fetching doctor patients:", error);
          if (isActive) {
            setPatients(mockPatients);
            setFollowUpPatients([]);
          }
        } finally {
          if (isActive) {
            setLoading(false);
            setFollowUpLoading(false);
          }
        }
      };

      fetchPatients();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handlePress = (item) => {
    const status = item.status || "مستقر";

    switch (status) {
      case "حرج":
      case "CRITICAL":
        // navigation.navigate("CriticalCondition", { patient: item });
        navigation.navigate("StableCondition", {
          patient: {
            id: item.id,
            userId: item.user?.id,
            name: item.user?.name || item.name,
            age: item.age,
            gender: item.gender,
            bloodType: item.bloodType,
          },
        });
        break;
      case "يحتاج متابعة":
      case "FOLLOW_UP":
        navigation.navigate("FollowUpScreen", {
          patient: {
            id: item.id,
            userId: item.user?.id,
            name: item.user?.name || item.name,
            age: item.age,
            gender: item.gender,
            bloodType: item.bloodType,
          },
        });
        break;
      case "مستقر":
      case "STABLE":
        navigation.navigate("StableCondition", {
          patient: {
            id: item.id,
            userId: item.user?.id,
            name: item.user?.name || item.name,
            age: item.age,
            gender: item.gender,
            bloodType: item.bloodType,
          },
        });
        break;
      default:
        navigation.navigate("StableCondition", {
          patient: {
            id: item.id,
            userId: item.user?.id,
            name: item.user?.name || item.name,
            age: item.age,
            gender: item.gender,
            bloodType: item.bloodType,
            photourl: item.user?.photourl,
          },
        });
        break;
    }
  };

  // تأمين الفلترة والبحث مع دعم البحث في الاسم الخارجي أو داخل الـ user object
  const filteredPatients = Array.isArray(patients)
    ? patients.filter((p) => {
        const nameToSearch = p.user?.name || p.name || "";
        return nameToSearch.toLowerCase().includes(searchQuery.toLowerCase());
      })
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Section */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{patients.length}</Text>
              <Text style={styles.statLabel}>مريض حالي</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4</Text>
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

          {/* New Follow-up Section with FlatList */}
          {followUpLoading ? (
            <ActivityIndicator
              size="small"
              color="#641919"
              style={{ marginVertical: 15 }}
            />
          ) : followUpPatients.length === 0 ? (
            <Text
              style={[
                styles.emptyText,
                { textAlign: "center", marginVertical: 15 },
              ]}
            >
              لا يوجد مرضى تحت المتابعة حالياً
            </Text>
          ) : (
            <FlatList
              data={followUpPatients}
              keyExtractor={(item) =>
                item.id?.toString() || Math.random().toString()
              }
              scrollEnabled={false}
              renderItem={({ item }) => {
                const patientName =
                  item.user?.name || item.name || "مريض غير معروف";
                const patientAge = item.age || item.user?.age;
                const bloodType = item.bloodType || "غير محدد";
                const patientStatus = item.status || "STABLE";

                // مطابقة مسمى الصورة الدقيق القادم من السيرفر (حروف صغيرة)
                const patientPhoto =
                  item.user?.photourl ||
                  item.photourl ||
                  item.user?.image ||
                  item.image ||
                  item.user?.photo ||
                  item.photo;

                const isCritical =
                  patientStatus === "حرج" || patientStatus === "CRITICAL";
                const isFollowUp =
                  patientStatus === "يحتاج متابعة" ||
                  patientStatus === "FOLLOW_UP";

                const borderColor = isCritical
                  ? "#E63946"
                  : isFollowUp
                    ? "#F59F00"
                    : "#2F9E44";
                const statusBg = isCritical
                  ? "#FFDCE0"
                  : isFollowUp
                    ? "#FFF9DB"
                    : "#D3F9D8";
                const statusText = isCritical
                  ? "#E63946"
                  : isFollowUp
                    ? "#F59F00"
                    : "#2F9E44";
                const statusLabel = isCritical
                  ? "حرج"
                  : isFollowUp
                    ? "يحتاج متابعة"
                    : "مستقر";

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handlePress(item)}
                    style={[styles.card, { borderStartColor: borderColor }]}
                  >
                    <View style={styles.cardHeader}>
                      <View style={styles.patientInfo}>
                        <View style={styles.nameRow}>
                          <View
                            style={[
                              styles.badge,
                              { backgroundColor: statusBg },
                            ]}
                          >
                            <Text
                              style={[styles.badgeText, { color: statusText }]}
                            >
                              {statusLabel}
                            </Text>
                          </View>
                          <Text style={styles.patientName}>{patientName}</Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            marginTop: 4,
                          }}
                        >
                          {patientAge ? (
                            <Text
                              style={[styles.updateText, { marginLeft: 10 }]}
                            >
                              العمر: {patientAge} سنة
                            </Text>
                          ) : (
                            <Text
                              style={[styles.updateText, { marginLeft: 10 }]}
                            >
                              فصيلة الدم: {bloodType}
                            </Text>
                          )}
                          <Text style={styles.updateText}>
                            آخر تحديث : {item.update || "منذ فترة وجيزة"}
                          </Text>
                        </View>

                        <Text
                          style={{
                            textAlign: "right",
                            justifyContent: "center",
                            alignSelf: "center",
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#7D0A0A",
                            marginVertical: 10,
                            marginRight: 80,
                          }}
                        >
                          عرض التفاصيل ←
                        </Text>
                      </View>

                      {patientPhoto ? (
                        <Image
                          source={{ uri: patientPhoto }}
                          style={styles.avatar}
                        />
                      ) : (
                        <View style={[styles.avatar, styles.fallbackAvatar]}>
                          <MaterialCommunityIcons
                            name="account-circle"
                            size={50}
                            color="#8e8e8e"
                          />
                        </View>
                      )}
                    </View>

                    {item.aiAlert && (
                      <View
                        style={[
                          styles.aiBox,
                          {
                            backgroundColor: isCritical ? "#FFF5F5" : "#FFFFF0",
                          },
                        ]}
                      >
                        <Ionicons
                          name="arrow-back"
                          size={18}
                          color="#666"
                          style={{ marginRight: 10 }}
                        />
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                          <Text style={styles.aiTitle}>
                            تم ملاحظة تغييرات بواسطة AI
                          </Text>
                          <Text style={[styles.aiDesc, { color: statusText }]}>
                            {item.aiMessage ||
                              "يرجى مراجعة المؤشرات الحيوية بشكل عاجل."}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {/* Search/Filtered Section Title Splitter */}
          <View style={[styles.titleWrapper, { marginTop: 20 }]}>
            <Text style={styles.sectionTitle}>كل المرضى المطابقين للبحث</Text>
          </View>

          {/* قسم كل المرضى المطابقين للبحث المحدث بالكامل */}
          {filteredPatients.length > 0 ? (
            filteredPatients.map((item) => {
              const isCritical =
                item.status === "حرج" || item.status === "CRITICAL";
              const isFollowUp =
                item.status === "يحتاج متابعة" || item.status === "FOLLOW_UP";

              const borderColor = isCritical
                ? "#E63946"
                : isFollowUp
                  ? "#F59F00"
                  : "#2F9E44";
              const statusBg = isCritical
                ? "#FFDCE0"
                : isFollowUp
                  ? "#FFF9DB"
                  : "#D3F9D8";
              const statusText = isCritical
                ? "#E63946"
                : isFollowUp
                  ? "#F59F00"
                  : "#2F9E44";
              const statusLabel = isCritical
                ? "حرج"
                : isFollowUp
                  ? "يحتاج متابعة"
                  : "مستقر";

              const patientName =
                item.user?.name || item.name || "مريض غير معروف";
              const patientAge = item.age || item.user?.age;
              const bloodType = item.bloodType || "غير محدد";

              // مطابقة مسمى الصورة الدقيق القادم من السيرفر (حروف صغيرة)
              const patientPhoto =
                item.user?.photourl ||
                item.photourl ||
                item.user?.image ||
                item.image ||
                item.user?.photo ||
                item.photo;

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
                        <View
                          style={[styles.badge, { backgroundColor: statusBg }]}
                        >
                          <Text
                            style={[styles.badgeText, { color: statusText }]}
                          >
                            {statusLabel}
                          </Text>
                        </View>
                        <Text style={styles.patientName}>{patientName}</Text>
                      </View>

                      {patientAge ? (
                        <Text style={[styles.updateText, { marginLeft: 10 }]}>
                          العمر: {patientAge} سنة
                        </Text>
                      ) : (
                        <Text style={[styles.updateText, { marginRight: 10 }]}>
                          فصيلة الدم: {bloodType}
                        </Text>
                      )}
                      <Text style={styles.updateText}>
                        تاريخ التسجيل:{" "}
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("ar-EG")
                          : "منذ فترة"}
                      </Text>
                    </View>

                    {patientPhoto ? (
                      <Image
                        source={{ uri: patientPhoto }}
                        style={styles.avatar}
                      />
                    ) : (
                      <View style={[styles.avatar, styles.fallbackAvatar]}>
                        <MaterialCommunityIcons
                          name="account-circle"
                          size={50}
                          color="#8e8e8e"
                        />
                      </View>
                    )}
                  </View>

                  {/* تنبيه الذكاء الاصطناعي */}
                  {item.aiAlert && (
                    <View
                      style={[
                        styles.aiBox,
                        {
                          backgroundColor: isCritical ? "#FFF5F5" : "#FFFFF0",
                        },
                      ]}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={18}
                        color="#666"
                        style={{ marginRight: 10 }}
                      />
                      <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text style={styles.aiTitle}>
                          تم ملاحظة تغييرات بواسطة AI
                        </Text>
                        <Text style={[styles.aiDesc, { color: statusText }]}>
                          {item.aiMessage ||
                            "يرجى مراجعة المؤشرات الحيوية بشكل عاجل."}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.emptyText}>
              لا يوجد مرضى مطابقين للبحث حالياً.
            </Text>
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
    textAlign: "left",
    flexDirection: "row",
  },
  detailsText: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
