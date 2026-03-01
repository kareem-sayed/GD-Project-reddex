import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function SignupSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <View style={styles.content}>
        {/* الصورة */}
        <Image
          source={require("../../../assets/images/onboarding/success.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>تم إنشاء حسابك!</Text>

        <Text style={styles.subtitle}>
          مبروك! حسابك جاهز دلوقتي.{"\n"}
          تقدر تشوف نتائج تحاليلك وتستفيد من كل مميزات التطبيق.
        </Text>
      </View>

      {/* زر أسفل الشاشة */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Home")}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>ابدأ الاستخدام</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },

  content: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 300,
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
