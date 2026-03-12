import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function TrackingScreen({ navigation }) {
  const totalScreens = 4;
  const currentScreen = 2;

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>السابق</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("RoleSelectScreen")}>
          <Text style={styles.skipText}>تخطي</Text>
        </TouchableOpacity>
      </View>

      {/* Content Box */}
      <View style={styles.contentBox}>
        <Text style={styles.title}>متابعة التحاليل</Text>
        <Image
          source={require("../../assets/images/onboarding/tracking.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.description}>
          سجل تحاليل الدم بتاعتك وشوف التغيرات مع الوقت بسهولة. هتقدر تفهم صحتك
          من خلال رسومات واضحة وبسيطة.
        </Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {[...Array(totalScreens)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i + 1 === currentScreen ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("AlertScreen")}
      >
        <Text style={styles.nextText}>التالي</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16, // x:16 من Figma
    paddingTop: 150, // y:150 من Figma (نزول العناصر)
    backgroundColor: "#fff",
  },
  topButtonsContainer: {
    position: "absolute",
    top: 74, // y:74 من Figma
    left: 16, // x:16 من Figma
    right: 16, // لو عايزة المسافة من الطرف التاني
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backText: { color: "#7D0A0A", fontSize: 16, fontWeight: "600" },
  skipText: { color: "#7D0A0A", fontSize: 16, fontWeight: "600" },
  contentBox: {
    width: 358, // من Figma
    height: 440, // من Figma
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: { width: width * 0.7, height: width * 0.7, marginBottom: 16 },
  description: { fontSize: 16, textAlign: "center", color: "#555" },
  dotsContainer: { flexDirection: "row", gap: 8, marginBottom: 40, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 6 },
  activeDot: {  width: 8, height: 6,backgroundColor: "#7D0A0A" },
  inactiveDot: { backgroundColor: "#C8C8C8" },
  nextButton: {
    backgroundColor: "#7D0A0A",
    width: 358, // من Figma
    height: 42, // من Figma
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    
    alignItems: "center",
  },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
