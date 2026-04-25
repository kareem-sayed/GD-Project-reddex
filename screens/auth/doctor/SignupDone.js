import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function UnderReviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>حسابك تحت المراجعة</Text>

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
          onPress={() => navigation.replace("DoctorHomeScreen")}
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
    backgroundColor: "#F5F5F5",
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
    width: 220,
    height: 220,
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
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
    paddingHorizontal: 16, // X = 16
    paddingBottom: 24,
    backgroundColor: "#FAF7F2",
  },
  button: {
    width: "100%", // بدل 358
    height: 42, // زي فيجما
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
