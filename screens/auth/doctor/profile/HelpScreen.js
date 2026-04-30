import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export default function HelpScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>المساعدة</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-forward" size={24} color="#641919" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>تواصل</Text>

          <View style={styles.optionsRow}>
            {/*email*/}
            <TouchableOpacity style={styles.optionBox}>
              <Ionicons name="mail-outline" size={30} color="#333" />
              <Text style={styles.optionText}>البريد الإلكتروني</Text>
            </TouchableOpacity>

            {/*chat*/}
            <TouchableOpacity style={styles.optionBox}>
              <Ionicons name="chatbubble-outline" size={30} color="#333" />
              <Text style={styles.optionText}>المحادثة</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{ alignSelf: "center", marginTop: 10}}>
          <Text style={styles.linkText}>الأحكام والشروط</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCF8",
  },
  header: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
    paddingBottom: 5,
  },
  headerContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionLabel: {
    textAlign: "left",
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
    marginRight: 5,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  helpCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  helpTitle: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  optionBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#5a2929",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
