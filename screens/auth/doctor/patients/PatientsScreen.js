import React from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PatientsScreen = ({ navigation }) => {
  // fake data for patients
  const patients = [
    {
      id: "1",
      name: "عمر فاروق",
      status: "حرج",
      statusBg: "#FFDCE0",
      statusText: "#E63946",
      update: "منذ ساعتين",
      borderColor: "#E63946",
      aiAlert: true,
      aiMessage: "ارتفاع ملحوظ في نسبة الحديد ومخزون الفيريتين",
      image: "https://i.pravatar.cc/150?u=omar",
    },
    {
      id: "2",
      name: "أحمد خالد",
      status: "يحتاج متابعة",
      statusBg: "#FFF9DB",
      statusText: "#F59F00",
      update: "منذ ساعة",
      borderColor: "#F59F00",
      aiAlert: true,
      aiMessage: "انخفاض طفيف في بعض المؤشرات",
      image: "https://i.pravatar.cc/150?u=ahmed",
    },
    {
      id: "3",
      name: "سارة أمين",
      status: "مستقر",
      statusBg: "#D3F9D8",
      statusText: "#2F9E44",
      update: "الأمس",
      borderColor: "#2F9E44",
      aiAlert: false,
      image: "https://i.pravatar.cc/150?u=sara",
    },
  ];
  const handlePress = (item) => {
    switch (item.status) {
      case "حرج":
        navigation.navigate("CriticalCondition");
        break;
      case "يحتاج متابعة":
        navigation.navigate("FollowUpScreen");
        break;
      case "مستقر":
        navigation.navigate("StableCondition");
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المرضى</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>مريض حالي</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>124</Text>
            <Text style={styles.statLabel}>كل المرضى</Text>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.test}>
          <Text style={styles.sectionTitle}>ابحث عن مريض</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#C4C4C4" />
          <TextInput
            placeholder="بحث"
            style={styles.searchInput}
            placeholderTextColor="#C4C4C4"
          />
        </View>

        {/* List Title */}
        <View style={styles.test}>
          <Text style={styles.sectionTitle}>مرضى تحت المتابعة</Text>
        </View>
        {/* Patient Cards */}
        {patients.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
            // style={[styles.card, { borderRightColor: item.borderColor }]}
            style={[styles.card, { borderStartColor: item.borderColor }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.patientInfo}>
                <View style={styles.nameRow}>
                  <View
                    style={[styles.badge, { backgroundColor: item.statusBg }]}
                  >
                    <Text
                      style={[styles.badgeText, { color: item.statusText }]}
                    >
                      {item.status}
                    </Text>
                  </View>

                  <Text style={styles.patientName}>{item.name}</Text>
                </View>
                <Text style={styles.updateText}>آخر تحديث : {item.update}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.avatar} />
            </View>

            {item.aiAlert && (
              <View
                style={[
                  styles.aiBox,
                  { backgroundColor: item.id === "1" ? "#FFF5F5" : "#FFFFF0" },
                ]}
              >
                <Ionicons
                  name="arrow-back"
                  size={18}
                  color="#666"
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                  <Text style={[styles.aiTitle, { textAlign: "right" }]}>
                    تم ملاحظة تغييرات بواسطة AI
                  </Text>
                  <Text style={[styles.aiDesc, { color: item.statusText }]}>
                    {item.aiMessage}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientsScreen;

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
    textAlign: "right",
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
