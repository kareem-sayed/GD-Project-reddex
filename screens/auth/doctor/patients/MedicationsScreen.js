import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MedicationsScreen = ({ route, navigation }) => {
  // استقبال الأدوية المرسلة، وإذا لم توجد نضع قائمة فارغة كاحتياط
  const { initialMeds = [] } = route.params || {};

  // جعل الـ State تبدأ بالبيانات القادمة من الصفحة السابقة
  const [medications, setMedications] = useState(initialMeds);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDose, setNewMedDose] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);

  // وظيفة الإضافة
  const handleAddMedication = () => {
    if (newMedName && newMedDose) {
      const newMed = {
        id: Math.random().toString(),
        name: newMedName,
        dose: newMedDose,
      };
      setMedications([...medications, newMed]);
      setNewMedName("");
      setNewMedDose("");
    }
  };

  // فتح مودال الحذف
  const openDeleteConfirm = (id) => {
    setSelectedMedId(id);
    setDeleteModalVisible(true);
  };

  // تنفيذ الحذف
  const confirmDelete = () => {
    setMedications(medications.filter((m) => m.id !== selectedMedId));
    setDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CriticalCondition", {
              updatedMeds: medications,
            });
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الادوية</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        
        {/* الأدوية الحالية */}
        <Text style={styles.sectionTitle}>الأدوية الحالية</Text>
        <View style={styles.medsCard}>
          {medications.length > 0 ? (
            medications.map((item, index) => (
              <View key={item.id || index.toString()}>
                <View style={styles.medRow}>
                  {/* أيقونة الحذف على اليسار كما في الصورة */}
                  <TouchableOpacity onPress={() => openDeleteConfirm(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#666" />
                  </TouchableOpacity>

                  {/* تفاصيل الدواء */}
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
            <Text style={{ textAlign: "center", color: "#AAA" }}>
              لا توجد أدوية حالية
            </Text>
          )}
        </View>

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

      {/* مودال الحذف (Pop-up) */}
      <Modal
        transparent={true}
        visible={deleteModalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>حذف دواء</Text>
            <Text style={styles.modalDesc}>
              نحذف دواء {medications.find((m) => m.id === selectedMedId)?.name}{" "}
              من روشتة المريض ؟
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={confirmDelete}
              >
                <Text style={styles.confirmBtnText}>اه احذف</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>لا تحذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
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
    justifyContent: "space-between", 
    alignItems: "center",
    justifyContent: "flex-start", 
    // paddingRight: 20, 
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
  medDetails: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
  },
  // medName: { fontSize: 16, color: "#333", fontWeight: "500" },
  // medDose: { fontSize: 12, color: "#AAA" },
  // divider: { height: 1, backgroundColor: "#EEE", marginVertical: 5 },
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalDesc: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmBtn: {
    backgroundColor: "#641919",
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  confirmBtnText: { color: "#FFF", fontWeight: "bold" },
  cancelBtn: {
    backgroundColor: "#FFF",
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#641919",
  },
  cancelBtnText: { color: "#641919", fontWeight: "bold" },
});

export default MedicationsScreen;
