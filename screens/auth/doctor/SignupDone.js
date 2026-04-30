import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function UnderReviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      {/* <Text style={styles.title}>حسابك تحت المراجعة</Text> */}

      {/* Image */}
      <Image
        source={require("../../../assets/images/doctorImages/review.png")} // حط الصورة هنا
        style={styles.image}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={styles.description}>
        استلمنا بياناتك... فريق Reddex بيراجع المستندات.
      </Text>

      <Text style={styles.subText}>
        هيجيلك إشعار أول ما الحساب يتوثق وتقدر تبدأ استخدام التطبيق كدكتور.
      </Text>

      {/* Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("DoctorTaps")}
        >
          <Text style={styles.buttonText}>فهمت</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },

  image: {
    width: "100%", // ياخد عرض الشاشة كله
    aspectRatio: 1, // أو حسب الصورة (مثلاً 1 أو 1.2)
    marginBottom: 20,
  },

  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
    marginBottom: 10,
  },

  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    lineHeight: 22,
  },
  bottomSection: {
    width: "100%",
    paddingHorizontal: 16, // X = 16
    paddingBottom: 24,
    backgroundColor: "#FAF7F2",
  },
  button: {
    width: "100%", // بدل 358
    height: 50, // زي فيجما
    borderRadius: 12,
    backgroundColor: "#7D0A0A",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20, // padding H = 20
    paddingVertical: 6, // padding V = 6

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
