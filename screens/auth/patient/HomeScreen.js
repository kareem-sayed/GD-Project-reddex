// HomeScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView ,StatusBar} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <Text style={styles.title}>أهلاً بيك في Home Screen</Text>

      <Text style={styles.subtitle}>ده مجرد اختبار للصفحة</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("ضغطت على الزر!")}
      >
        <Text style={styles.buttonText}>اضغط هنا</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555" }]}
        onPress={() => navigation.navigate("WelcomeScreen")}
      >
        <Text style={styles.buttonText}>روح للـ Welcome Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#7D0A0A",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7D0A0A",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
