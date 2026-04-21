import { StyleSheet, Text, View,StatusBar,Image,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import ProfileHeader from '../../../components/ProfileHeader'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
        <ProfileHeader navigation={navigation} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, gap: 8,marginTop:15,marginBottom:15 }}>
              <Image
              source={require('../../../../assets/images/profile/Gemini_Generated_Image_r6e3jyr6e3jyr6e3.png')}
              style={{ width: 70, height: 70, borderRadius: 35, marginLeft: 15 }}
              />
              <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>علي محمد</Text>
              <Text style={{ fontSize: 12, fontWeight: 400 ,color:'#646461f3' }}>  ذكر    28 سنة</Text>
              <Text style={{ fontSize: 12, fontWeight: 400 ,color:'#646461f3' }}>  فصيلة الدم :  AB</Text>
              </View>
        </View>

        <View style={styles.card}>
                  <View style={{display:"flex",flexDirection:"row",width:"100%",gap:6,alignItems:"center"}}>
                    <View style={styles.statusIndicator}></View>
                    <Text style={styles.medicineName }> حالتك الصحية مستقرة </Text>
                    </View>
        </View>
        
        <View style={styles.textContainer}>
                  <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
                    حالتي الصحية 
                  </Text> 
                  <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Text style={{ fontSize: 15, color: "#784847", fontWeight: 400 ,textDecorationLine:"underline", textDecorationColor:"#784847"}}>
                      تعديل  
                    </Text>
                  </TouchableOpacity>
        </View>

        <View style={styles.card}>    
                  <View style={styles.textContainer2}>
                        <View>
                        <Text style={styles.subText}>
                          انيميا
                        </Text>
                        <Text style={styles.subText}>
                        حمي البحر المتوسط
                        </Text>
                      </View>
                  </View>
        </View>

        <View style={styles.textContainer}>
                  <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
                  ادويتك الحالية
                  </Text> 
        </View>

        <View style={styles.card}> 
            <View style={{display:"flex",flexDirection:"column"}}> 
                      <View style={styles.textContainer2}>       
                        <Text style={styles.medicineName}>Rocaltrol</Text>    
                        <Text style={styles.subText}>
                              1 كبسولة - مرة يوميًا
                        </Text>
                      </View>
                      <View style={styles.textContainer2}>       
                        <Text style={styles.medicineName}>Rocaltrol</Text>    
                        <Text style={styles.subText}>
                              1 كبسولة - مرة يوميًا
                        </Text>
                      </View>
                      <View style={styles.textContainer2}>       
                        <Text style={styles.medicineName}>Rocaltrol</Text>    
                        <Text style={styles.subText}>
                              1 كبسولة - مرة يوميًا
                        </Text>
                      </View>
          </View>    
        </View>

        <View style={styles.textContainer}>
                  <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
                  اخر تحاليلك
                  </Text> 
        </View>
        <View style={styles.card}>    
                  <View style={styles.textContainer2}>
                    <View style={{display:"flex",flexDirection:"column"}}> 
                    <View style={{display:"flex",flexDirection:"row", gap:10,}}>
                        <Text style={styles.medicineName}>مستوى الهيموغلوبين</Text>
                        <Text style={styles.subText,{color:"#b9c422"}} >
                            منخفض نسبيا
                        </Text>
                    </View>
        
                    <View style={{display:"flex",flexDirection:"row", gap:10,}}>
                        <Text style={styles.medicineName}>مستوى التغيير</Text>
                        <Text style={styles.subText,{color:"#22c417"}} >
                            مستقر
                        </Text>
                    </View>
        
                    <View style={{display:"flex",flexDirection:"row", gap:10,}}>
                      <Text style={styles.time}> الوقت:</Text>
                      <Text style={styles.time}>3 ايام </Text>
                    </View>
                  </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF8",
  
  }, 
  card: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 2, // Android shadow
  },
  medicineName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusIndicator: {
    width: 15,
    height: 15,
    backgroundColor: "green",
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    height: 40,
    justifyContent:"space-between",
    flexDirection:"row",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  textContainer2: {
    display:"flex",
    flexDirection:"row",
    marginBottom: 7,
    justifyContent:"space-between",
    alignItems: "center",
    width: "100%",       
  }
})