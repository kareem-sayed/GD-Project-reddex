import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params || {};
  const [menuVisible, setMenuVisible] = useState(false);
  // --- States ---
  const [name, setName] = useState(userData?.name || "عادل حافظ");
  const [email, setEmail] = useState(userData?.email || "email@domain.com");
  const [phone, setPhone] = useState(userData?.phone || "01234567899");
  const [specialty, setSpecialty] = useState(userData?.specialty || "باطنة");
  const [experience, setExperience] = useState(userData?.experience || "11");

  // clinic info
  const [clinicName, setClinicName] = useState(
    userData?.clinicName || "عيادات الامل",
  );
  const [address, setAddress] = useState(
    userData?.address || "شارع الخليفة الظاهر مدينة نصر",
  );

  // work hours
  const [startTime, setStartTime] = useState(
    userData?.workingHours?.split(" إلي ")[0] || "8:00 pm",
  );
  const [endTime, setEndTime] = useState(
    userData?.workingHours?.split(" إلي ")[1] || "9:00 pm",
  );
  // State for selected days of the week, with default values for "ح", "ن", "ر")
  const [selectedDays, setSelectedDays] = useState(["ح", "ن", "ر"]);
  // prices
  const [price, setPrice] = useState(userData?.price || "200");
  const [consultation, setConsultation] = useState(
    userData?.consultation || "100",
  );
  // state for profile image
  const [image, setImage] = useState(
    userData?.image || "https://i.pravatar.cc/300?img=12",
  );
  const pickImage = async () => {
    // request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("عذراً", "نحتاج إذن للوصول لمعرض الصور الخاص بك!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // update state with new image URI
    }
  };

  // toggle day selection
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const handleSave = () => {
    // map Arabic letters to full day names for display
    const daysMapping = {
      س: "سبت",
      ح: "أحد",
      ن: "اثنين",
      ت: "ثلاثاء",
      ر: "أربعاء",
      خ: "خميس",
      ج: "جمعة",
    };
    const formattedDays = selectedDays
      .map((day) => daysMapping[day])
      .join(" - ");
    const updatedData = {
      image,
      name,
      email,
      phone,
      specialty,
      experience,
      clinicName,
      address,
      workingHours: `${startTime} إلي ${endTime}`,
      workingDays: formattedDays,
      price,
      consultation,
    };
    // navigate back to profile screen with updated data
    navigation.navigate("DoctorProfileScreen", { updatedData });
  };

  // reusable input component
  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    icon,
    isLocation,
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color="#999"
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={[styles.input, { textAlign: "right" }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
        />
        {isLocation && (
          <Ionicons name="location-outline" size={18} color="#999" />
        )}
      </View>
    </View>
  );
  const [region, setRegion] = useState({
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الملف الشخصي</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Personal Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            {/* for icon click */}
            <TouchableOpacity style={styles.editIconBadge} onPress={pickImage}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color="#444"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* 1.personal info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المعلومات الشخصية</Text>
          <View style={styles.card}>
            <InputField label="الإسم" value={name} onChangeText={setName} />
            <InputField
              label="البريد الإلكتروني"
              value={email}
              onChangeText={setEmail}
            />
            <InputField
              label="رقم التليفون"
              value={phone}
              onChangeText={setPhone}
            />
            <InputField
              label="كلمة السر"
              value="********"
              icon="eye-off-outline"
            />
          </View>
        </View>

        {/* 2.working info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المعلومات المهنية</Text>
          <View style={styles.card}>
            <InputField
              label="التخصص"
              value={specialty}
              onChangeText={setSpecialty}
            />
            <InputField
              label="عدد سنين الخبرة"
              value={experience}
              onChangeText={setExperience}
            />
          </View>
        </View>

        {/* 3. clinic info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>مكان العمل</Text>
          <View style={styles.card}>
            <InputField
              label="اسم العيادة"
              value={clinicName}
              onChangeText={setClinicName}
            />
            <InputField
              label="العنوان"
              value={address}
              onChangeText={setAddress}
              isLocation={true}
            />
            {/* real map location */}
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
              >
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  title="موقع العيادة"
                />
              </MapView>
            </View>
          </View>
        </View>
        {/* 4. Work Hours (Dynamic Days) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>مواعيد العمل</Text>
          <View style={styles.card}>
            <Text style={styles.label}>الأيام</Text>
            <View style={styles.daysRow}>
              {["س", "ح", "ن", "ت", "ر", "خ", "ج"].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleDay(day)}
                  style={[
                    styles.dayCircle,
                    selectedDays.includes(day) && styles.selectedDay,
                  ]}
                >
                  <Text style={styles.dayText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: 15 }]}>الساعات</Text>
            <View style={styles.timeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.subLabel}>إلى</Text>
                <TextInput
                  style={styles.timeInput}
                  value={endTime}
                  onChangeText={setEndTime}
                />
              </View>
              <View style={{ width: 20 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.subLabel}>من</Text>
                <TextInput
                  style={styles.timeInput}
                  value={startTime}
                  onChangeText={setStartTime}
                />
              </View>
            </View>
          </View>
        </View>

        {/* 5. prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الأسعار</Text>
          <View style={styles.card}>
            <InputField
              label="الكشف"
              value={price}
              onChangeText={setPrice}
              placeholder="200 جنية"
            />
            <InputField
              label="الإستشارة"
              value={consultation}
              onChangeText={setConsultation}
              placeholder="100 جنية"
            />
          </View>
        </View>

        {/* save button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>حفظ</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    // elevation: 2,
    Index: 10,
    //only shadow at the bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#333" },
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
  scrollContent: { paddingBottom: 80 },
  imageSection: { alignItems: "center", marginVertical: 20 },
  imageWrapper: { position: "relative" },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  editIconBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FDE7C1",
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  section: { paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    elevation: 1,
  },
  inputContainer: { marginBottom: 15 },
  label: {
    textAlign: "left",
    color: "#333",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  subLabel: {
    textAlign: "center",
    color: "#E9E9E9",
    fontSize: 12,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: "#FFFFFF",
  },
  input: { flex: 1, fontSize: 14, color: "#333" },
  mapPlaceholder: {
    height: 120,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  mapContainer: {
    height: 200,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 4,
    // marginHorizontal: 6,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedDay: { backgroundColor: "#FDE7C1", borderColor: "#EBCB8B" },
  dayText: { fontSize: 12, fontWeight: "bold" },
  timeRow: { flexDirection: "row-reverse", justifyContent: "space-between" },
  timeInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    height: 45,
    textAlign: "center",
    backgroundColor: "#F9F9F9",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#601010",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default EditProfileScreen;
