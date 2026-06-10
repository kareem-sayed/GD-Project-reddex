import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import ProfileHeader from '../../../components/ProfileHeader'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PatientContext } from '../../../../backEnd/context/PatientContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  // 1. استدعاء profile, medications, و results من الكونتكست
  const { profile, medications, results } = useContext(PatientContext); 

  // ==================== معالجة البيانات ====================
  
  // استخراج آخر تحليل (للحالة الصحية)
  const latestResult = results && results.length > 0 ? results[0] : null;
  const severityLevel = latestResult?.result?.severity_level;
  
  let statusColor = "#ccc"; 
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

  // استخراج قائمة الأمراض الفريدة من جميع التحاليل
  const extractedDiseases = results ? [...new Set(results.map(r => r.result?.disease_type).filter(Boolean))] : [];

  // أخذ آخر 3 تحاليل فقط لعرضها
  const recentResults = results ? results.slice(0, 3) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
        <ProfileHeader navigation={navigation} />

        {/* معلومات المستخدم الأساسية */}
        <View style={styles.userHeaderSection}>
          <Image
            source={{ uri: profile?.user?.photourl }}
            style={styles.profileImage}
          />
          <View style={styles.userInfoText}>
            <Text style={styles.userNameText}>{profile?.user?.name || "جاري التحميل..."}</Text>
            <Text style={styles.userSubDetails}>
              | {profile?.user?.age || 'غير محدد'} سنة
            </Text>
            <Text style={styles.userSubDetails}>فصيلة الدم: {profile?.bloodType || "غير محددة"}</Text>
          </View>
        </View>

        {/* حالتي الصحية (معتمدة على التحليل) */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 18, color: "#111111", fontWeight: "bold" }}>
            حالتي الصحية
          </Text>
        </View>
        <View style={styles.card}>
          <View style={{ display: "flex", flexDirection: "row", width: "100%", gap: 8, alignItems: "center" }}>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]}></View>
            <Text style={styles.medicineName}>{statusText}</Text>
          </View>
        </View>
        
        {/* الأمراض المسجلة (المستخرجة من التحاليل) */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            الامراض المسجلة 
          </Text> 
        </View>

        <View style={styles.card}>    
          <View style={styles.textContainerVertical}>
            {extractedDiseases && extractedDiseases.length > 0 ? (
              extractedDiseases.map((disease, idx) => (
                <Text key={idx} style={styles.subText}>• {disease}</Text>
              ))
            ) : (
              <Text style={styles.subText}>لا توجد أمراض مسجلة من التحاليل</Text>
            )}
          </View>
        </View>

        {/* الأدوية الحالية */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            ادويتك الحالية
          </Text> 
        </View>

        <View style={styles.card}> 
          <View style={{ display: "flex", flexDirection: "column", width: "100%" }}> 
            {medications?.allMedications && medications.allMedications.length > 0 ? (
              medications.allMedications.map((med, idx) => (
                <View key={idx} style={styles.textContainer2}>      
                  <Text style={styles.medicineName}>{med.trim()}</Text>    
                  <Text style={styles.subText}>1 كبسولة - مرة يوميًا</Text>
                </View>
              ))
            ) : (
              <Text style={styles.subText}>لا توجد أدوية حالية</Text>
            )}
          </View>    
        </View>

        {/* آخر تحاليلك (أول 3 تحاليل) */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            اخر تحاليلك
          </Text> 
        </View>
        
        {recentResults.length > 0 ? (
          recentResults.map((resItem, idx) => (
            <View key={idx} style={styles.card}>
              <View style={{ display: "flex", flexDirection: "column", width: "100%", gap: 6 }}>
                
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text style={styles.medicineName}>{resItem.result?.disease_type || "لم يتم التحديد"}</Text>
                  <Text 
                    style={[
                      styles.subText, 
                      { 
                        color: resItem.result?.severity_level === "Severe" ? "#e91e10" : 
                               resItem.result?.severity_level === "Moderate" ? "#f59e0b" : "#22c417",
                        fontWeight: "bold"
                      }
                    ]}
                  >
                    {resItem.result?.severity_level === "Severe" ? "خطير" : 
                     resItem.result?.severity_level === "Moderate" ? "متوسط" : "مستقر"}
                  </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text style={styles.medicineName}>تاريخ التحليل:</Text>
                  <Text style={styles.time}>
                     {new Date(resItem.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric', month: 'short', day: 'numeric'
                     })}
                  </Text>
                </View>

                <View style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                  <Text style={styles.medicineName}>ملخص التقرير:</Text>
                  <Text style={[styles.subText, { lineHeight: 22, textAlign: 'left' }]} numberOfLines={3}>
                    {resItem.result?.doctor_summary || "لا يوجد ملخص متاح لهذا التحليل."}
                  </Text>
                </View>

              </View>
            </View>
          ))
        ) : (
          <View style={styles.card}>
             <Text style={styles.subText}>لا توجد تحاليل مسجلة حالياً...</Text>
          </View>
        )}
        
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  }, 
  userHeaderSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    gap: 15
  },
  profileImage: {
    width: 75, 
    height: 75, 
    borderRadius: 37.5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  userInfoText: {
    flex: 1,
    justifyContent: 'center',
  },
  userNameText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#111'
  },
  userSubDetails: {
    fontSize: 13, 
    color: '#646461',
    marginTop: 2
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medicineName: {
    fontSize: 15,
    fontWeight: "bold",
    color: '#333'
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: 'center'
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
  textContainerVertical: {
    flexDirection: 'column',
    gap: 6,
    width: '100%'
  },
  textContainer2: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",       
  },
  time: {
    fontSize: 13,
    color: '#999'
  }
})