import React, { useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import { getMyPrescriptions, getPatientProfile, getResults } from "../../../../backEnd/api/services/patientApi";
import { PatientContext } from "../../../../backEnd/context/PatientContext";
import { Ionicons } from "@expo/vector-icons";
import { registerDeviceToken } from "../../../../backEnd/api/services/authApi";
import { getFCMTokenAsync } from "../../../components/notificationHelper/notificationHelper";

export default function HomeScreen({ navigation }) {
  const {
    profile,
    setProfile,
    medications,
    setMedications,
    results,
    setResults,
  } = useContext(PatientContext);

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getPatientProfile();
      setProfile(data);
      console.log("✅ Fetched Profile");
      return data;
    } catch (err) {
      console.error("❌ Profile Error:", err.response?.data || err.message);
      return null;
    }
  };

  const fetchMedications = async () => {
    try {
      const data = await getMyPrescriptions(); 
      setMedications(data);
      console.log("✅ Fetched Medications", data);
    } catch (err) {
      console.error("❌ Medications Error:", err.response?.data || err.message);
    }
  };

  const fetchResults = async () => {
    try {
      const data = await getResults();
      setResults(data);
      console.log("✅ Fetched Results");
    } catch (err) {
      console.error("❌ Results Error:", err.response?.data || err.message);
    }
  };

 useFocusEffect(
    useCallback(() => {
      const loadScreenData = async () => {
        setLoading(true);
        try {
          // الكود القديم بتاعك بيحمل الداتا
          await Promise.all([
            fetchProfile(),
            fetchMedications(),
            fetchResults()
          ]);

          // 🔥 التعديل الجديد: جلب التوكن وإرساله للباك إند
          const fcmToken = await getFCMTokenAsync();
          if (fcmToken) {
            await registerDeviceToken(fcmToken);
          }

        } catch (error) {
          console.error("❌ Error loading screen data:", error.message);
        } finally {
          setLoading(false); 
        }
      };

      loadScreenData();
      return () => {};
    }, []) 
  );

  const Item = ({ icon, title, nav }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate(nav)} >
        <View style={styles.circle}>
          <Ionicons name={icon} size={28} color="#8B7E66" />
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  // المتغيرات الخاصة بالحالة الصحية بناءً على آخر تحليل
  const latestResult = results && results.length > 0 ? results[0] : null;
  const severityLevel = latestResult?.result?.severity_level;
  
  // تحديد اللون والنص بناءً على الخطورة
  let statusColor = "#ccc"; // رصاصي لو مفيش داتا
  let statusText = "لا توجد بيانات";

  if (severityLevel === "Severe") {
    statusColor = "#e91e10"; // أحمر
    statusText = "غير مستقر (خطير)";
  } else if (severityLevel === "Moderate") {
    statusColor = "#f59e0b"; // برتقالي
    statusText = "متوسط";
  } else if (severityLevel) {
    statusColor = "#22c417"; // أخضر
    statusText = "مستقر";
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>

        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

        <View style={styles.containeritem}>
          <Item icon="calendar-outline" title="تابع مع دكتور" nav="Search" />
          <Item icon="flask-outline" title="افهم تحاليلك" nav="UploadFileScreen" />
          <Item icon="medical-outline" title="تشخيص الأعراض" nav="ChatScreen" />
        </View>

        <View style={styles.containerImage}>
          <Image
            source={require('../../../../assets/images/homepage/home.png')}
            style={{ width: "100%", height: 180, resizeMode: "contain", borderRadius: 22 }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            ادويتك
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Medicins")}>
            <Text style={{ fontSize: 15, color: "#784847", fontWeight: "400", textDecorationLine: "underline", textDecorationColor: "#784847" }}>
              كل الادوية
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.textContainer2}>
            {medications && medications.allMedications && medications.allMedications.length > 0 ? (
              medications.allMedications.map((item, index) => {
                
                // 1. تحديد اسم الدواء والتعليمات بناءً على نوع الداتا اللي راجعة
                const isString = typeof item === 'string';
                const medName = isString ? item.trim() : (item?.medicationName?.trim() || 'دواء غير مسجل');
                const medInstructions = isString ? 'جرعة غير محددة' : (item?.instructions?.trim() || 'جرعة غير محددة');

                return (
                  <View key={index} style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 8, alignItems: 'center' }}>
                    
                    <Text style={styles.medicineName}>
                      {medName}
                    </Text>

                    {/* هنعرض التعليمات (الجرعة) لو موجودة أو هنكتب رسالة افتراضية */}
                    <Text style={styles.subText}>
                      {medInstructions}
                    </Text>
                    
                  </View>
                );
              })
            ) : (
              <Text style={styles.subText}>لا توجد أدوية مسجلة حالياً...</Text>
            )}
          </View>

          <View style={styles.iconContainer}>
            <Text style={{ fontSize: 20 }}>💊</Text>
          </View>
        </View>

        {/* ===================== قسم الحالة الصحية ===================== */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 18, color: "#111111", fontWeight: "bold" }}>
            حالتك الصحية
          </Text>
        </View>

        <View style={styles.card}>
          <View style={{ display: "flex", flexDirection: "row", width: "100%", gap: 6, alignItems: "center" }}>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]}></View>
            <Text style={styles.medicineName}> {statusText} </Text>
          </View>
        </View>

        {/* ===================== قسم آخر تحليل ===================== */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 16, color: "#111111", fontWeight: "bold" }}>
            اخر تحليل
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.textContainer2}>
            {latestResult ? (
              <View>
                {/* التاريخ */}
                <View style={{ display: "flex", flexDirection: "row", gap: 10, marginBottom: 8 }}>
                  <Text style={styles.medicineName}>تاريخ التحليل:</Text>
                  <Text style={[styles.time, { marginTop: 0 }]}>
                    {new Date(latestResult.createdAt).toLocaleDateString('ar-EG', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </Text>
                </View>

                {/* ملخص الدكتور */}
                <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Text style={styles.medicineName}>ملخص التقرير:</Text>
                  <Text style={[styles.subText, { lineHeight: 22, textAlign: 'left' }]} numberOfLines={3}>
                    {latestResult.result?.doctor_summary || "لا يوجد ملخص متاح لهذا التحليل."}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.subText}>لا توجد تحاليل مسجلة حالياً...</Text>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDFCF8",
    padding: 10,
  }, 
  containeritem: {
    flexDirection: "row",
    justifyContent: "space-around", 
    gap: 5,
  },
  item: {
    alignItems: "center",
    width: "32%",
    backgroundColor: "#FDFCF8",
    borderRadius: 10,
    paddingVertical: 10,
    borderColor:"#E9E9E9",
    borderWidth:1,
  },
  circle: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 30,
    backgroundColor: "#EDE4D8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  containerImage: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 22,
  },
  textContainer: {
    marginTop: 6,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    height: 40,
    justifyContent:"space-between",
    flexDirection:"row",
  },
  card: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 2, 
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
   
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textContainer2: {
    flex: 1,
    alignItems: "flex-start", // تم تعديلها لتجنب تحذيرات الـ Layout
  },
  medicineName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  time: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
});
