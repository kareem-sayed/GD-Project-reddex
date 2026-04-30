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

export default function SettingsScreen({ navigation }) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-forward" size={24} color="#641919" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>إعدادات الحساب</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Section favorites */}
        <Text style={styles.sectionLabel}>التفضيلات</Text>

        <View style={styles.card}>
          {/*Notifications*/}
          <View style={styles.row}>
            <Switch
              trackColor={{ false: "#D1D1D1", true: "#7D1C1C" }}
              thumbColor={"#FFF"}
              ios_backgroundColor="#D1D1D1"
              onValueChange={() =>
                setIsNotificationsEnabled((previousState) => !previousState)
              }
              value={isNotificationsEnabled}
            />
            <Text style={styles.rowText}>الإشعارات</Text>
          </View>

          <View style={styles.divider} />

          {/*languages*/}
          <TouchableOpacity
            style={[styles.row, { flexDirection: "row-reverse" }]}
          >
            <Ionicons name="chevron-down" size={20} color="#666" />
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.rowText}>اللغات</Text>
              <Text style={styles.subText}>قم باختيار لغتك المفضلة</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <Text style={[styles.sectionLabel, { marginTop: 25 }]}>الحساب</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="logout" size={22} color="#D32F2F" />
            <Text style={[styles.rowText, { color: "#D32F2F" }]}>
              تسجيل خروج
            </Text>
          </TouchableOpacity>
        </View>

        {/* Edit Account Information */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 18,
            },
          ]}
        >
          <Text style={styles.rowText}>تعديل معلومات الحساب</Text>
          <Ionicons name="chevron-back" size={20} color="#333" />
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
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
    paddingBottom: 5,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 5,
  },
  sectionLabel: {
    // textAlign: "right",
    fontSize: 18,
    color: "#585858",
    marginBottom: 10,
    marginRight: 5,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  row: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  rowText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000000",
  },
  subText: {
    fontSize: 13,
    color: "#8d8a8a",
    marginTop: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#D4D4D4",
  },
});
