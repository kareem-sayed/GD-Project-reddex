import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DoctorProfileScreen({ navigation, route }) {
  const [menuVisible, setMenuVisible] = useState(false);

  // 1.basic user data
  const [userData, setUserData] = useState({
    name: "عادل حافظ",
    specialty: "باطنة",
    experience: "10",
    email: "email@domain.com",
    phone: "01234567899",
    clinicName: "عيادات الامل",
    address: "شارع الخليفة الظاهر مدينة نصر",
    price: "200",
    consultation: "100",
    workingHours: "8:00 مساءاً إلي 9:00 مساءاً",
    workingDays: "أحد - اثنين - أربع",
    image: "https://i.pravatar.cc/300?img=12",
  });

  // 2.update data from EditProfileScreen
  useEffect(() => {
    if (route.params?.updatedData) {
      setUserData((prevData) => ({
        ...prevData,
        ...route.params.updatedData,
      }));
    }
  }, [route.params?.updatedData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={26}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>الملف الشخصي</Text>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-forward" size={26} color="#641919" />
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);

                    navigation.navigate("EditProfileScreen", {
                      userData: userData,
                    });
                  }}
                >
                  <Text style={styles.menuText}>تعديل الملف الشخصي</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("AccountSettings");
                  }}
                >
                  <Text style={styles.menuText}>الإعدادات</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("HelpScreen");
                  }}
                >
                  <Text style={styles.menuText}>المساعدة</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Doctor Information */}
        <View style={styles.doctorInfoSection}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.8</Text>
            <Ionicons name="star" size={19} color="#efcf16" />
          </View>

          <View style={styles.profileRow}>
            <View style={styles.textData}>
              <Text style={styles.drName}>د . {userData.name}</Text>
              <Text style={styles.drSubText}>{userData.specialty}</Text>
              <Text style={styles.drExperience}>
                +{userData.experience} سنين خبرة
              </Text>
            </View>
            <Image
              source={{ uri: userData.image }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statTitle}>مريض حالي</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statTitle}>كل المرضي</Text>
          </View>
        </View>

        {/* Clinic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>مكان العمل</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>الاسم :</Text>
            <Text style={styles.value}>{userData.clinicName}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>عنوان :</Text>
            <Text style={styles.value}>{userData.address}</Text>
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>مواعيد العمل</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>مواقيت العمل :</Text>
            <Text style={styles.value}>{userData.workingHours}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>ايام العمل :</Text>
            <Text style={styles.value}>{userData.workingDays}</Text>
          </View>
        </View>

        {/* Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>الأسعار</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>الكشف :</Text>
            <Text style={styles.value}>{userData.price} جنية</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>الاستشارة :</Text>
            <Text style={styles.value}>{userData.consultation} جنية</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF8",
  },
  header: {
    backgroundColor: "#FFF",
    zIndex: 10,
    //only shadow at the bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  dropdownMenu: {
    position: "absolute",
    top: Platform.OS === "ios" ? 100 : 60,
    right: 20,
    backgroundColor: "#FFF",
    width: 180,
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    color: "#1c1b1b",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#918e8e",
    marginHorizontal: 15,
  },
  scrollPadding: {
    paddingBottom: 80,
  },
  doctorInfoSection: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 15,
    flexDirection: "row-reverse",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 5,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  profileRow: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 80,
  },
  textData: {
    marginLeft: 10,
    alignItems: "flex-start",
  },
  drName: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  drSubText: {
    fontSize: 15,
    color: "#777",
    marginTop: 2,
  },
  drExperience: {
    fontSize: 13,
    color: "#AAA",
    marginTop: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    width: "47%",
    height: 90,
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderColor: "#F0F0F0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statTitle: {
    color: "#888",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    paddingRight: 5,
  },
  dataRow: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: "#585858",
    textAlign: "left",
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    color: "#585858",
    flex: 1,
    textAlign: "left",
    paddingLeft: 10,
  },
});
