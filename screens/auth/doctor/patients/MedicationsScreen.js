import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// API Calls
import {
  getDoctorPatients,
  getPatientPrescriptions,
  addPrescription,
  deletePrescription,
  updatePrescription,
} from "../../../../backEnd/api/services/doctorApi";

export default function MedicationsScreen({ route, navigation }) {
  const {
    initialMeds = [],
    targetScreen = "StableCondition",
    patientId,
    patient,
  } = route.params || {};

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(patientId || null);
  const [medications, setMedications] = useState(initialMeds);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);

  const [newMedName, setNewMedName] = useState("");
  const [newMedDose, setNewMedDose] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);

  const [timesPerDay, setTimesPerDay] = useState([]);
  const [tempTime, setTempTime] = useState("");

  // العثور على اسم الدواء المحدد حالياً لعرضه في المودال
  const currentMedication = medications.find((m) => m.id === selectedMedId);

  // API: Fetch doctor patients
  useEffect(() => {
    const fetchPatientsList = async () => {
      try {
        setLoadingPatients(true);

        console.log("LOG: Fetching doctor patients...");
        const res = await getDoctorPatients();

        console.log(
          "LOG: Patients response:",
          JSON.stringify(res?.data, null, 2),
        );

        const patientsArray =
          res?.data?.data?.data || res?.data?.data || res?.data || [];

        if (Array.isArray(patientsArray)) {
          setPatients(patientsArray);
          if (!selectedPatientId) {
            setMedications([]);
            return;
          }
        } else {
          setPatients([]);
        }
      } catch (error) {
        console.log("LOG: Error fetching patients inside Medications:", error);
        Alert.alert("خطأ", "فشل في تحميل قائمة المرضى.");
        setPatients([]);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatientsList();
  }, []);

  // API: Fetch prescriptions for selected patient
  const fetchPrescriptions = async () => {
    try {
      setLoadingPrescriptions(true);

      const res = await getPatientPrescriptions(selectedPatientId);
      if (!selectedPatientId) return;

      const medsArray =
        res?.data?.data?.data || res?.data?.data || res?.data || [];

      const normalized = medsArray.map((item) => ({
        id: item.id,
        name: item.medicationName,
        dose: item.instructions,
      }));

      setMedications(normalized);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPrescriptions(false);
    }
  };
  useEffect(() => {
    if (selectedPatientId) fetchPrescriptions();
  }, [selectedPatientId]);

  // Logic to handle dynamically pushing unique, valid times into array state
  const handleAddTimeSlot = () => {
    console.log("ADD TIME CLICKED", tempTime);
    const isValidTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(tempTime.trim());

    if (!isValidTime) {
      Alert.alert(
        "خطأ في الصيغة",
        "يرجى إدخال الوقت بصيغة 24 ساعة صحيحة (HH:mm) مثل 08:30",
      );
      return;
    }

    if (timesPerDay.includes(tempTime.trim())) {
      Alert.alert("تنبيه", "هذا الوقت مضاف بالفعل للمواعيد.");
      return;
    }

    // Sort times sequentially for cleaner display logic
    setTimesPerDay((prev) => [...prev, tempTime.trim()].sort());
    // setTempTime("");
    // setTimesPerDay((prev) =>
    //   [...prev, tempTime.trim()].sort((a, b) => {
    //     const [ah, am] = a.split(":").map(Number);
    //     const [bh, bm] = b.split(":").map(Number);
    //     return ah * 60 + am - (bh * 60 + bm);
    //   }),
    // );
    setTimesPerDay([]);
    setTempTime("");
  };

  const handleRemoveTimeSlot = (timeToRemove) => {
    setTimesPerDay((prev) => prev.filter((time) => time !== timeToRemove));
  };

  const handleAddMedication = async () => {
    try {
      if (!selectedPatientId || !newMedName || !newMedDose) return;
      if (timesPerDay.length === 0) {
        Alert.alert("مطلوب", "يرجى إضافة موعد جرعة واحد على الأقل.");
        return;
      }

      console.log(" [POST] Creating prescription...");

      const payload = {
        patientId: selectedPatientId,
        medicationName: newMedName,
        instructions: newMedDose, // مؤقتًا مستخدمين dose هنا
        durationInDays: 7,
        startDate: new Date().toISOString().split("T")[0],
        timesPerDay, // Passing dynamic local array state
        timezone: "Africa/Cairo",
      };

      console.log("Payload Sent:");
      console.log(JSON.stringify(payload, null, 2));

      const res = await addPrescription(payload);

      console.log("[POST] Response:");
      console.log(JSON.stringify(res?.data, null, 2));
      const created = res?.data?.data;
      if (!created) {
        Alert.alert("خطأ", "لم يتم إنشاء الدواء بشكل صحيح");
        return;
      }

      const newItem = {
        id: created.id,
        name: created.medicationName,
        dose: created.instructions,
      };

      console.log("New Medication Added:");
      console.log(newItem);

      // setMedications((prev) => [...prev, newItem]);
      await fetchPrescriptions();
      setNewMedName("");
      setNewMedDose("");
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("FULL ERROR:", error);
    }
  };
  const openDeleteConfirm = (id) => {
    setSelectedMedId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      console.log("[DELETE] ID:", selectedMedId);

      // 1. احذف الأول
      await deletePrescription(selectedMedId);
      console.log("🟢 Deleted successfully");

      // 2. بعد الحذف هات الداتا الجديدة
      const res = await getPatientPrescriptions(selectedPatientId);

      console.log("🔄 [DELETE] Refetched data:");
      console.log(JSON.stringify(res?.data, null, 2));

      const medsArray =
        res?.data?.data?.data || res?.data?.data || res?.data || [];

      const normalized = medsArray.map((item) => ({
        id: item.id,
        name: item.medicationName,
        dose: item.instructions,
      }));

      // setMedications(normalized);
      // setDeleteModalVisible(false);
      setSelectedMedId(id);
      await deletePrescription(id);
    } catch (error) {
      console.log(error);
      Alert.alert("خطأ", "فشل حذف الدواء");
    }
  };
  const handleUpdateMedication = async () => {
    try {
      const payload = {
        patientId: selectedPatientId,
        medicationName: newMedName,
        instructions: newMedDose,
        durationInDays: 7,
        startDate: "2026-06-12",
        timesPerDay: ["08:00", "20:00"],
        timezone: "Africa/Cairo",
      };

      await updatePrescription(selectedMedId, payload);

      await fetchPrescriptions();
    } catch (error) {
      Alert.alert("خطأ", "فشل تعديل الدواء");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(targetScreen, {
              patient,
              updatedMeds: medications,
            });
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الأدوية</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* الأدوية الحالية القادمة من الـ API للمريض المختار */}
        <Text style={styles.sectionTitle}>الأدوية الحالية</Text>

        {loadingPrescriptions ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="#641919" />
          </View>
        ) : (
          <View style={styles.medsCard}>
            {medications.length > 0 ? (
              medications.map((item, index) => (
                <View key={item.id || index.toString()}>
                  <View style={styles.medRow}>
                    <TouchableOpacity
                      onPress={() => openDeleteConfirm(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.medInfoContainer}>
                      <Text style={styles.medName}>{item.name}</Text>
                      <Text style={styles.medDose}>{item.dose}</Text>
                    </View>
                  </View>

                  {index < medications.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.emptyMedsText}>
                لا توجد أدوية مسجلة لهذا المريض حالياً
              </Text>
            )}
          </View>
        )}

        {/* إضافة دواء جديد */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          إضافة دواء جديد
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>اسم الدواء</Text>
          <TextInput
            placeholder="الاسم"
            style={styles.input}
            placeholderTextColor="#C4C4C4"
            value={newMedName}
            onChangeText={setNewMedName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>الجرعة</Text>
          <TextInput
            placeholder="الجرعة"
            style={styles.input}
            placeholderTextColor="#C4C4C4"
            value={newMedDose}
            onChangeText={setNewMedDose}
          />
        </View>
        {/* Dynamic Scheduler Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>مواعيد الجرعات اليومية</Text>

          <View style={styles.timeInputRow}>
            <TouchableOpacity
              style={styles.timeAddBtn}
              onPress={handleAddTimeSlot}
            >
              <Text style={styles.timeAddBtnText}>إضافة وقت</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="08:00"
              style={[styles.input, styles.timeInputSpec]}
              placeholderTextColor="#C4C4C4"
              maxLength={5}
              value={tempTime}
              onChangeText={setTempTime}
              keyboardType="numbers-and-punctuation"
            />
          </View>

          {/* Dynamic List Render View for Added Times */}
          {timesPerDay.length > 0 && (
            <View style={styles.scheduleBadgeContainer}>
              {timesPerDay.map((time, idx) => (
                <View key={idx.toString()} style={styles.timeTag}>
                  <Text style={styles.timeTagText}>{time}</Text>
                  <TouchableOpacity onPress={() => handleRemoveTimeSlot(time)}>
                    <Ionicons
                      name="close-circle"
                      size={16}
                      color="#D32F2F"
                      style={{ marginRight: 4 }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.addBtn,
            (!newMedName || !newMedDose) && styles.addBtnDisabled,
          ]}
          onPress={handleAddMedication}
          disabled={!newMedName || !newMedDose}
        >
          <Text style={styles.addBtnText}>إضافة</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* مودال تأكيد الحذف المطور كلياً كبطاقة منبثقة صحية */}
      <Modal
        transparent={true}
        visible={deleteModalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardContainer}>
            <View style={styles.modalIconHeader}>
              <Ionicons name="trash-bin" size={28} color="#D32F2F" />
            </View>

            <Text style={styles.modalCardTitle}>حذف دواء</Text>

            <Text style={styles.modalCardDesc}>
              هل أنت متأكد من حذف دواء{" "}
              <Text style={styles.medHighlight}>
                [{currentMedication?.name || "هذا الدواء"}]
              </Text>{" "}
              ؟
            </Text>

            <View style={styles.modalCardButtonsRow}>
              <TouchableOpacity
                style={styles.modalCardCancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalCardCancelText}>لا تحذف</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalCardConfirmBtn}
                onPress={confirmDelete}
              >
                <Text style={styles.modalCardConfirmText}>اه احذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderBottomWidth: 0.2,
    borderBottomColor: "#EEE",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#000" },
  content: { padding: 20 },
  sectionTitle: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  medsCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    paddingHorizontal: 15,
  },
  medRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  medInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  medName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "right",
  },
  medDose: {
    fontSize: 13,
    color: "#888",
    textAlign: "right",
    paddingLeft: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#f7f4f4",
    width: "100%",
  },
  inputGroup: { marginBottom: 20 },
  label: {
    textAlign: "left",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    paddingHorizontal: 15,
    textAlign: "right",
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: "#641919",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addBtnDisabled: { backgroundColor: "#D8C5C5" },
  addBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  emptyMedsText: {
    textAlign: "center",
    color: "#888",
    paddingVertical: 10,
  },

  // تصميم المودال العصري الجديد (Card-Style UI)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  modalCardContainer: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    // الظلال وأنظمة التباين
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIconHeader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 10,
    textAlign: "center",
  },
  modalCardDesc: {
    fontSize: 15,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  medHighlight: {
    fontWeight: "bold",
    color: "#641919",
  },
  modalCardButtonsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalCardCancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 12, // مسافة بين الزرين تدعم الـ RTL الطبيعي
  },
  modalCardCancelText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalCardConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#641919", 
  },
  modalCardConfirmText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
