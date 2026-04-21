// HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView ,StatusBar,Image,ScrollView} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%"}}>

        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

        <View style={styles.containeritem}> 
          <Item icon="calendar-outline" title="تابع مع  دكتور " nav="Search" />
          <Item icon="flask-outline" title="افهم تحاليلك" nav="Search" />
          <Item icon="medical-outline" title="تشخيص الأعراض" nav="Search"/>
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
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={{ fontSize: 15, color: "#784847", fontWeight: 400 ,textDecorationLine:"underline", textDecorationColor:"#784847"}}>
              كل الادوية    
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>    
          <View style={styles.textContainer2}>
            <View style={{display:"flex",flexDirection:"row", gap:10,}}>
                <Text style={styles.medicineName}>Rocaltrol</Text>
                <Text style={styles.subText}>
                  1 كبسولة - مرة يوميًا
                </Text>
            </View>

            <View style={{display:"flex",flexDirection:"row", gap:10,}}>
              <Text style={styles.time}>ميعادك الجاي:</Text>
              <Text style={styles.time}>9:00 مساءً</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="link-outline" size={20} color="#8B6F47" />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={{ fontSize: 18, color: "#111111", fontWeight: "bold" }}>
            حالتك الصحية 
          </Text> 
        </View>

        <View style={styles.card}>
          <View style={{display:"flex",flexDirection:"row",width:"100%",gap:6,alignItems:"center"}}>
            <View style={styles.statusIndicator}></View>
            <Text style={styles.medicineName }> حالتك الصحية مستقرة </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
          <Text style={{ fontSize: 16, color: "#111111", fontWeight: "bold" }}>
            اخر تحليل
          </Text> 
        </View>

          <View style={styles.card}>    
          <View style={styles.textContainer2}>
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
    elevation: 2, // Android shadow
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F3EDE6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textContainer2: {
    flex: 1,
    
    alignItems: "flex-Start",
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
    backgroundColor: "green",
    borderRadius: 10,
  },
});
