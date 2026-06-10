// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Modal,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const MedicationsScreen = ({ route, navigation }) => {
//   // استقبال الأدوية المرسلة، وإذا لم توجد نضع قائمة فارغة كاحتياط
//   const { initialMeds = [] } = route.params || {};

//   // جعل الـ State تبدأ بالبيانات القادمة من الصفحة السابقة
//   const [medications, setMedications] = useState(initialMeds);
//   const [newMedName, setNewMedName] = useState("");
//   const [newMedDose, setNewMedDose] = useState("");
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedMedId, setSelectedMedId] = useState(null);

//   // وظيفة الإضافة
//   const handleAddMedication = () => {
//     if (newMedName && newMedDose) {
//       const newMed = {
//         id: Math.random().toString(),
//         name: newMedName,
//         dose: newMedDose,
//       };
//       setMedications([...medications, newMed]);
//       setNewMedName("");
//       setNewMedDose("");
//     }
//   };

//   // فتح مودال الحذف
//   const openDeleteConfirm = (id) => {
//     setSelectedMedId(id);
//     setDeleteModalVisible(true);
//   };

//   // تنفيذ الحذف
//   const confirmDelete = () => {
//     setMedications(medications.filter((m) => m.id !== selectedMedId));
//     setDeleteModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("CriticalCondition", {
//               updatedMeds: medications,
//             });
//           }}
//         >
//           <Ionicons name="arrow-forward" size={24} color="#641919" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>الادوية</Text>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//       >
        
//         {/* الأدوية الحالية */}
//         <Text style={styles.sectionTitle}>الأدوية الحالية</Text>
//         <View style={styles.medsCard}>
//           {medications.length > 0 ? (
//             medications.map((item, index) => (
//               <View key={item.id || index.toString()}>
//                 <View style={styles.medRow}>
//                   {/* أيقونة الحذف على اليسار كما في الصورة */}
//                   <TouchableOpacity onPress={() => openDeleteConfirm(item.id)}>
//                     <Ionicons name="trash-outline" size={20} color="#666" />
//                   </TouchableOpacity>

//                   {/* تفاصيل الدواء */}
//                   <View style={styles.medInfoContainer}>
//                      <Text style={styles.medName}>{item.name}</Text>
//                     <Text style={styles.medDose}>{item.dose}</Text>
                   
//                   </View>
//                 </View>

//                 {index < medications.length - 1 && (
//                   <View style={styles.divider} />
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text style={{ textAlign: "center", color: "#AAA" }}>
//               لا توجد أدوية حالية
//             </Text>
//           )}
//         </View>

//         {/* إضافة دواء جديد */}
//         <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
//           إضافة دواء جديد
//         </Text>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>اسم الدواء</Text>
//           <TextInput
//             placeholder="الاسم"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedName}
//             onChangeText={setNewMedName}
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>الجرعة</Text>
//           <TextInput
//             placeholder="الجرعة"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedDose}
//             onChangeText={setNewMedDose}
//           />
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.addBtn,
//             (!newMedName || !newMedDose) && styles.addBtnDisabled,
//           ]}
//           onPress={handleAddMedication}
//           disabled={!newMedName || !newMedDose}
//         >
//           <Text style={styles.addBtnText}>إضافة</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* مودال الحذف (Pop-up) */}
//       <Modal
//         transparent={true}
//         visible={deleteModalVisible}
//         animationType="fade"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>حذف دواء</Text>
//             <Text style={styles.modalDesc}>
//               نحذف دواء {medications.find((m) => m.id === selectedMedId)?.name}{" "}
//               من روشتة المريض ؟
//             </Text>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.confirmBtn}
//                 onPress={confirmDelete}
//               >
//                 <Text style={styles.confirmBtnText}>اه احذف</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => setDeleteModalVisible(false)}
//               >
//                 <Text style={styles.cancelBtnText}>لا تحذف</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// // الاستدعاءات الخاصة بالـ APIs المطلوبة للمرحلتين
// import { getDoctorPatients, getPatientPrescriptions } from "../../../../backEnd/api/services/doctorApi";

// const MedicationsScreen = ({ route, navigation }) => {
//   const { initialMeds = [], targetScreen = "StableCondition", patientId } = route.params || {};

//   const [patients, setPatients] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState(patientId || null);
//   const [medications, setMedications] = useState(initialMeds);
//   const [loadingPatients, setLoadingPatients] = useState(false);
//   const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);

//   const [newMedName, setNewMedName] = useState("");
//   const [newMedDose, setNewMedDose] = useState("");
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedMedId, setSelectedMedId] = useState(null);

//   // API: Fetch doctor patients
//   useEffect(() => {
//     const fetchPatientsList = async () => {
//       try {
//         setLoadingPatients(true);
//         console.log("LOG: Fetching doctor patients...");
//         const res = await getDoctorPatients();
//         console.log("LOG: Patients response:", JSON.stringify(res.data, null, 2));
//         setPatients(res.data || []);
        
//         // إذا لم يأتِ معرف مريض محدد من الشاشة السابقة نختار الأول افتراضياً
//         if (!selectedPatientId && res.data && res.data.length > 0) {
//           setSelectedPatientId(res.data[0].id);
//         }
//       } catch (error) {
//         console.log("LOG: Error fetching patients inside Medications:", error);
//         Alert.alert("خطأ", "فشل في تحميل قائمة المرضى.");
//       } finally {
//         setLoadingPatients(false);
//       }
//     };

//     fetchPatientsList();
//   }, []);

//   // API: Fetch prescriptions for selected patient
//   useEffect(() => {
//     if (!selectedPatientId) return;

//     const fetchPrescriptions = async () => {
//       try {
//         setLoadingPrescriptions(true);
//         console.log(`LOG: Fetching prescriptions for patientId: ${selectedPatientId}...`);
//         const res = await getPatientPrescriptions(selectedPatientId);
//         console.log("LOG: Prescriptions response:", JSON.stringify(res.data, null, 2));
        
//         // تعيين الأدوية الحية القادمة من الـ API مباشرة
//         if (res.data) {
//           setMedications(res.data);
//         }
//       } catch (error) {
//         console.log("LOG: Error fetching prescriptions:", error);
//         // عدم إظهار التنبيه المزعج إذا كانت الروشتة فارغة بالباك إند وجعلها مصفوفة فارغة
//         setMedications([]);
//       } finally {
//         setLoadingPrescriptions(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [selectedPatientId]);

//   const handleAddMedication = () => {
//     if (newMedName && newMedDose) {
//       const newMed = {
//         id: Math.random().toString(),
//         name: newMedName,
//         dose: newMedDose,
//       };
//       setMedications([...medications, newMed]);
//       setNewMedName("");
//       setNewMedDose("");
//     }
//   };

//   const openDeleteConfirm = (id) => {
//     setSelectedMedId(id);
//     setDeleteModalVisible(true);
//   };

//   const confirmDelete = () => {
//     setMedications(medications.filter((m) => m.id !== selectedMedId));
//     setDeleteModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate(targetScreen, {
//               updatedMeds: medications,
//             });
//           }}
//         >
//           <Ionicons name="arrow-forward" size={24} color="#641919" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>الادوية</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
//         {/* اختيار المريض الحالي لمتابعة أدويته */}
//         <Text style={styles.sectionTitle}>اختيار المريض</Text>
//         {loadingPatients ? (
//           <ActivityIndicator size="small" color="#641919" style={{ marginVertical: 10 }} />
//         ) : (
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
//             {patients.map((p) => (
//               <TouchableOpacity
//                 key={p.id}
//                 style={[
//                   { padding: 10, borderRadius: 20, backgroundColor: "#EAEAEA", marginRight: 8 },
//                   selectedPatientId === p.id && { backgroundColor: "#641919" }
//                 ]}
//                 onPress={() => setSelectedPatientId(p.id)}
//               >
//                 <Text style={[{ color: "#000" }, selectedPatientId === p.id && { color: "#FFF" }]}>{p.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         )}

//         {/* الأدوية الحالية القادمة من الـ API للمريض المختار */}
//         <Text style={styles.sectionTitle}>الأدوية الحالية</Text>
        
//         {loadingPrescriptions ? (
//           <View style={{ padding: 20 }}>
//             <ActivityIndicator size="large" color="#641919" />
//           </View>
//         ) : (
//           <View style={styles.medsCard}>
//             {medications.length > 0 ? (
//               medications.map((item, index) => (
//                 <View key={item.id || index.toString()}>
//                   <View style={styles.medRow}>
//                     <TouchableOpacity onPress={() => openDeleteConfirm(item.id)}>
//                       <Ionicons name="trash-outline" size={20} color="#666" />
//                     </TouchableOpacity>

//                     <View style={styles.medInfoContainer}>
//                       <Text style={styles.medName}>{item.name}</Text>
//                       <Text style={styles.medDose}>{item.dose || item.dosage}</Text>
//                     </View>
//                   </View>

//                   {index < medications.length - 1 && <View style={styles.divider} />}
//                 </View>
//               ))
//             ) : (
//               <Text style={{ textAlign: "center", color: "#AAA", paddingVertical: 10 }}>
//                 لا توجد أدوية مسجلة لهذا المريض حالياً
//               </Text>
//             )}
//           </View>
//         )}

//         {/* إضافة دواء جديد */}
//         <Text style={[styles.sectionTitle, { marginTop: 30 }]}>إضافة دواء جديد</Text>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>اسم الدواء</Text>
//           <TextInput
//             placeholder="الاسم"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedName}
//             onChangeText={setNewMedName}
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>الجرعة</Text>
//           <TextInput
//             placeholder="الجرعة"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedDose}
//             onChangeText={setNewMedDose}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.addBtn, (!newMedName || !newMedDose) && styles.addBtnDisabled]}
//           onPress={handleAddMedication}
//           disabled={!newMedName || !newMedDose}
//         >
//           <Text style={styles.addBtnText}>إضافة</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* مودال تأكيد الحذف */}
//       <Modal transparent={true} visible={deleteModalVisible} animationType="fade">
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
//           <View style={{ width: 300, backgroundColor: "#FFF", padding: 20, borderRadius: 10, alignItems: "center" }}>
//             <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>هل أنت متأكد من حذف هذا الدواء؟</Text>
//             <View style={{ flexDirection: "row" }}>
//               <TouchableOpacity style={{ flex: 1, padding: 10, alignItems: "center" }} onPress={() => setDeleteModalVisible(false)}>
//                 <Text style={{ color: "#666" }}>إلغاء</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{ flex: 1, padding: 10, alignItems: "center", backgroundColor: "#E63946", borderRadius: 5 }} onPress={confirmDelete}>
//                 <Text style={{ color: "#FFF" }}>تأكيد الحذف</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default MedicationsScreen;

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// // API Calls
// import { getDoctorPatients, getPatientPrescriptions } from "../../../../backEnd/api/services/doctorApi";

// export default function MedicationsScreen({ route, navigation }) {
//   const { initialMeds = [], targetScreen = "StableCondition", patientId } = route.params || {};

//   const [patients, setPatients] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState(patientId || null);
//   const [medications, setMedications] = useState(initialMeds);
//   const [loadingPatients, setLoadingPatients] = useState(false);
//   const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);

//   const [newMedName, setNewMedName] = useState("");
//   const [newMedDose, setNewMedDose] = useState("");
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedMedId, setSelectedMedId] = useState(null);

//   // API: Fetch doctor patients
//   useEffect(() => {
//     const fetchPatientsList = async () => {
//       try {
//         setLoadingPatients(true);
//         console.log("LOG: Fetching doctor patients...");
//         const res = await getDoctorPatients();
//         console.log("LOG: Patients response:", JSON.stringify(res.data, null, 2));
//         setPatients(res.data || []);
        
//         // إذا لم يأتِ معرف مريض محدد من الشاشة السابقة نختار الأول افتراضياً
//         if (!selectedPatientId && res.data && res.data.length > 0) {
//           setSelectedPatientId(res.data[0].id);
//         }
//       } catch (error) {
//         console.log("LOG: Error fetching patients inside Medications:", error);
//         Alert.alert("خطأ", "فشل في تحميل قائمة المرضى.");
//       } finally {
//         setLoadingPatients(false);
//       }
//     };

//     fetchPatientsList();
//   }, []);

//   // API: Fetch prescriptions for selected patient
//   useEffect(() => {
//     if (!selectedPatientId) return;

//     const fetchPrescriptions = async () => {
//       try {
//         setLoadingPrescriptions(true);
//         console.log(`LOG: Fetching prescriptions for patientId: ${selectedPatientId}...`);
//         const res = await getPatientPrescriptions(selectedPatientId);
//         console.log("LOG: Prescriptions response:", JSON.stringify(res.data, null, 2));
        
//         // تعيين الأدوية الحية القادمة من الـ API مباشرة
//         if (res.data) {
//           setMedications(res.data);
//         }
//       } catch (error) {
//         console.log("LOG: Error fetching prescriptions:", error);
//         // عدم إظهار التنبيه المزعج إذا كانت الروشتة فارغة بالباك إند وجعلها مصفوفة فارغة
//         setMedications([]);
//       } finally {
//         setLoadingPrescriptions(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [selectedPatientId]);

//   const handleAddMedication = () => {
//     if (newMedName && newMedDose) {
//       const newMed = {
//         id: Math.random().toString(),
//         name: newMedName,
//         dose: newMedDose,
//       };
//       setMedications([...medications, newMed]);
//       setNewMedName("");
//       setNewMedDose("");
//     }
//   };

//   const openDeleteConfirm = (id) => {
//     setSelectedMedId(id);
//     setDeleteModalVisible(true);
//   };

//   const confirmDelete = () => {
//     setMedications(medications.filter((m) => m.id !== selectedMedId));
//     setDeleteModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate(targetScreen, {
//               updatedMeds: medications,
//             });
//           }}
//         >
//           <Ionicons name="arrow-forward" size={24} color="#641919" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>الأدوية</Text>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
//         {/* اختيار المريض الحالي لمتابعة أدويته */}
//         <Text style={styles.sectionTitle}>اختيار المريض</Text>
//         {loadingPatients ? (
//           <ActivityIndicator size="small" color="#641919" style={{ marginVertical: 10 }} />
//         ) : (
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.patientsScroll}>
//             {patients.map((p) => (
//               <TouchableOpacity
//                 key={p.id}
//                 style={[
//                   styles.patientTab,
//                   selectedPatientId === p.id && styles.patientTabSelected
//                 ]}
//                 onPress={() => setSelectedPatientId(p.id)}
//               >
//                 <Text style={[styles.patientTabText, selectedPatientId === p.id && styles.patientTabTextSelected]}>
//                   {p.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         )}

//         {/* الأدوية الحالية القادمة من الـ API للمريض المختار */}
//         <Text style={styles.sectionTitle}>الأدوية الحالية</Text>
        
//         {loadingPrescriptions ? (
//           <View style={{ padding: 20 }}>
//             <ActivityIndicator size="large" color="#641919" />
//           </View>
//         ) : (
//           <View style={styles.medsCard}>
//             {medications.length > 0 ? (
//               medications.map((item, index) => (
//                 <View key={item.id || index.toString()}>
//                   <View style={styles.medRow}>
//                     <TouchableOpacity onPress={() => openDeleteConfirm(item.id)}>
//                       <Ionicons name="trash-outline" size={20} color="#666" />
//                     </TouchableOpacity>

//                     <View style={styles.medInfoContainer}>
//                       <Text style={styles.medName}>{item.name}</Text>
//                       <Text style={styles.medDose}>{item.dose || item.dosage}</Text>
//                     </View>
//                   </View>

//                   {index < medications.length - 1 && <View style={styles.divider} />}
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.emptyMedsText}>
//                 لا توجد أدوية مسجلة لهذا المريض حالياً
//               </Text>
//             )}
//           </View>
//         )}

//         {/* إضافة دواء جديد */}
//         <Text style={[styles.sectionTitle, { marginTop: 30 }]}>إضافة دواء جديد</Text>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>اسم الدواء</Text>
//           <TextInput
//             placeholder="الاسم"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedName}
//             onChangeText={setNewMedName}
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>الجرعة</Text>
//           <TextInput
//             placeholder="الجرعة"
//             style={styles.input}
//             placeholderTextColor="#C4C4C4"
//             value={newMedDose}
//             onChangeText={setNewMedDose}
//           />
//         </View>

//         <TouchableOpacity
//           style={[styles.addBtn, (!newMedName || !newMedDose) && styles.addBtnDisabled]}
//           onPress={handleAddMedication}
//           disabled={!newMedName || !newMedDose}
//         >
//           <Text style={styles.addBtnText}>إضافة</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* مودال تأكيد الحذف */}
//       <Modal transparent={true} visible={deleteModalVisible} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>هل أنت متأكد من حذف هذا الدواء؟</Text>
//             <View style={styles.modalButtonsRow}>
//               <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setDeleteModalVisible(false)}>
//                 <Text style={styles.modalCancelText}>إلغاء</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.modalConfirmBtn} onPress={confirmDelete}>
//                 <Text style={styles.modalConfirmText}>تأكيد الحذف</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }


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
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// API Calls
import { getDoctorPatients, getPatientPrescriptions } from "../../../../backEnd/api/services/doctorApi";

export default function MedicationsScreen({ route, navigation }) {
  const { initialMeds = [], targetScreen = "StableCondition", patientId } = route.params || {};

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(patientId || null);
  const [medications, setMedications] = useState(Array.isArray(initialMeds) ? initialMeds : []);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);

  const [newMedName, setNewMedName] = useState("");
  const [newMedDose, setNewMedDose] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);

  // API: Fetch doctor patients
  useEffect(() => {
    let isMounted = true;
    const fetchPatientsList = async () => {
      try {
        if (isMounted) setLoadingPatients(true);
        console.log("LOG: Fetching doctor patients...");
        const res = await getDoctorPatients();
        console.log("LOG: Patients response:", JSON.stringify(res?.data, null, 2));
        
        // === التعديل الآمن 1 ===
        const fetchedPatients = res?.data?.data?.data || res?.data?.data || res?.data || [];
        
        if (isMounted) {
          setPatients(Array.isArray(fetchedPatients) ? fetchedPatients : []);
          
          // حماية الاختيار التلقائي لأول مريض
          if (!selectedPatientId && Array.isArray(fetchedPatients) && fetchedPatients.length > 0) {
            setSelectedPatientId(fetchedPatients[0]?.id || fetchedPatients[0]?._id || null);
          }
        }
      } catch (error) {
        console.log("LOG: Error fetching patients inside Medications:", error);
        if (isMounted) setPatients([]);
      } finally {
        if (isMounted) setLoadingPatients(false);
      }
    };

    fetchPatientsList();
    return () => { isMounted = false; };
  }, []);

  // API: Fetch prescriptions for selected patient

  // new useEffect with guard for mock patient IDs to prevent unnecessary API calls and handle empty states gracefully
useEffect(() => {
  if (!selectedPatientId) return;
  
  // if the selected patient ID is a mock one (e.g., starts with "patient_"), we skip the API call and set medications to an empty array to prevent 400 errors and handle the case gracefully
  if (selectedPatientId.toString().includes("patient_")) {
    console.log("LOG: Mock patient selected, skipping API call to prevent 400 error.");
    setMedications([]); 
    return;
  }

  let isMounted = true;

  const fetchPrescriptions = async () => {
    try {
      if (isMounted) setLoadingPrescriptions(true);
      console.log(`LOG: Fetching prescriptions for patientId: ${selectedPatientId}...`);
      const res = await getPatientPrescriptions(selectedPatientId);
      console.log("LOG: Prescriptions response:", JSON.stringify(res?.data, null, 2));
      
      const incomingMeds = res?.data?.data?.data || res?.data?.data || res?.data || [];
      
      if (isMounted) {
        setMedications(Array.isArray(incomingMeds) ? incomingMeds : []);
      }
    } catch (error) {
      console.log("LOG: Error fetching prescriptions:", error);
      if (isMounted) setMedications([]); 
    } finally {
      if (isMounted) setLoadingPrescriptions(false);
    }
  };

  fetchPrescriptions();
  return () => { isMounted = false; };
}, [selectedPatientId]);
  // function to handle adding a new medication, with trimming and validation to prevent empty entries and ensure clean data
  const handleAddMedication = () => {
    if (newMedName.trim() && newMedDose.trim()) {
      const newMed = {
        id: Math.random().toString(),
        name: newMedName.trim(),
        dose: newMedDose.trim(),
      };
      setMedications((prevMeds) => [...(Array.isArray(prevMeds) ? prevMeds : []), newMed]);
      setNewMedName("");
      setNewMedDose("");
    }
  };

  const openDeleteConfirm = (id) => {
    setSelectedMedId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (Array.isArray(medications)) {
      setMedications(medications.filter((m) => m.id !== selectedMedId));
    }
    setDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(targetScreen, {
              updatedMeds: medications,
            });
          }}
        >
          <Ionicons name="arrow-forward" size={24} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الأدوية</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* اختيار المريض الحالي لمتابعة أدويته */}
        <Text style={styles.sectionTitle}>اختيار المريض</Text>
        {loadingPatients ? (
          <ActivityIndicator size="small" color="#641919" style={{ marginVertical: 10 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.patientsScroll}>
            {Array.isArray(patients) && patients.map((p) => (
              <TouchableOpacity
                key={p.id || Math.random().toString()}
                style={[
                  styles.patientTab,
                  selectedPatientId === p.id && styles.patientTabSelected
                ]}
                onPress={() => setSelectedPatientId(p.id)}
              >
                <Text style={[styles.patientTabText, selectedPatientId === p.id && styles.patientTabTextSelected]}>
                  {p.name || "مريض بدون اسم"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* الأدوية الحالية القادمة من الـ API للمريض المختار */}
        <Text style={styles.sectionTitle}>الأدوية الحالية</Text>
        
        {loadingPrescriptions ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="#641919" />
          </View>
        ) : (
          <View style={styles.medsCard}>
            {/* === التعديل الآمن 4 (حماية الـ map) === */}
            {Array.isArray(medications) && medications.length > 0 ? (
              medications.map((item, index) => (
                <View key={item.id || index.toString()}>
                  <View style={styles.medRow}>
                    <TouchableOpacity onPress={() => openDeleteConfirm(item.id)}>
                      <Ionicons name="trash-outline" size={20} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.medInfoContainer}>
                      <Text style={styles.medName}>{item.name}</Text>
                      <Text style={styles.medDose}>{item.dose || item.dosage || "الجرعة غير محددة"}</Text>
                    </View>
                  </View>

                  {index < medications.length - 1 && <View style={styles.divider} />}
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
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>إضافة دواء جديد</Text>

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
          style={[styles.addBtn, (!newMedName.trim() || !newMedDose.trim()) && styles.addBtnDisabled]}
          onPress={handleAddMedication}
          disabled={!newMedName.trim() || !newMedDose.trim()}
        >
          <Text style={styles.addBtnText}>إضافة</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* مودال تأكيد الحذف */}
      <Modal transparent={true} visible={deleteModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>هل أنت متأكد من حذف هذا الدواء؟</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalCancelText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={confirmDelete}>
                <Text style={styles.modalConfirmText}>تأكيد الحذف</Text>
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

