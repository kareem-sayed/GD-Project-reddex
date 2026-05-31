import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import ProfileHeader from '../../../components/ProfileHeader'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { PatientContext } from '../../../../backEnd/context/PatientContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
    const { profile ,medications} = useContext(PatientContext); 

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
              {profile?.user?.gender === 'male' ? 'ذكر' : profile?.user?.gender === 'female' ? 'أنثى' : 'غير محدد'} | {profile?.user?.age || 'غير محدد'} سنة
            </Text>
            <Text style={styles.userSubDetails}>فصيلة الدم: {profile?.bloodType || "غير محددة"}</Text>
          </View>
        </View>

        {/* حالة المريض */}
        <View style={styles.textContainer}>
                  <Text style={{ fontSize: 18, color: "#111111", fontWeight: "bold" }}>
                    حالتي الصحية
                  </Text>
        </View>
        <View style={styles.card}>
          <View style={{ display: "flex", flexDirection: "row", width: "100%", gap: 8, alignItems: "center" }}>
            <View style={[styles.statusIndicator, { backgroundColor: profile?.healthStatus === 'مستقر' ? '#22c417' : '#e91e10' }]}></View>
            <Text style={styles.medicineName}>{profile?.healthStatus === "مريض" ? "غير مستقر" : (profile?.healthStatus || "لا يوجد بيانات")} </Text>
          </View>
        </View>
        
        {/* حالتي الصحية */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            الامراض المسجلة 
          </Text> 
          {/* <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={{ fontSize: 15, color: "#784847", fontWeight: '400', textDecorationLine: "underline", textDecorationColor: "#784847" }}>
              تعديل  
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.card}>    
          <View style={styles.textContainerVertical}>
            {profile?.diseases && profile.diseases.length > 0 ? (
              profile.diseases.map((disease, idx) => (
                <Text key={idx} style={styles.subText}>• {disease.trim()}</Text>
              ))
            ) : (
              <Text style={styles.subText}>لا توجد أمراض مسجلة</Text>
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
            {medications.allMedications && medications.allMedications.length > 0 ? (
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

        {/* آخر تحاليلك */}
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
            اخر تحاليلك
          </Text> 
        </View>
        
        <View style={styles.card}>    
          <View style={{ display: "flex", flexDirection: "column", width: "100%", gap: 6 }}>
            {/* ✅ تصليح دمج الـ Styles بوضعهم في مصفوفة [ ] */}
            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={styles.medicineName}>مستوى الهيموغلوبين</Text>
              <Text style={[styles.subText, { color: "#b9c422" }]}>منخفض نسبيا</Text>
            </View>
 
            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={styles.medicineName}>مستوى التغيير</Text>
              <Text style={[styles.subText, { color: "#22c417" }]}>مستقر</Text>
            </View>
 
            <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
              <Text style={styles.time}>الوقت:</Text>
              <Text style={styles.time}>3 ايام </Text>
            </View>
          </View>
        </View>
        
        {/* إضافة مسافة في الأسفل مريحة للـ Scroll */}
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