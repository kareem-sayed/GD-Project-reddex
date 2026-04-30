import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  I18nManager,
  ScrollView,
} from "react-native";

// Force RTL for Arabic
I18nManager.forceRTL(true);

export default function RoleSelectScreen({ navigation }) {
  const [role, setRole] = useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Header Section ── */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>اختار دورك</Text>
            <Text style={styles.subtitle}>
              علشان نقدر نجهزلك تجربة مناسبة ليك، اختر إذا كنت مريض أو دكتور.
            </Text>
          </View>

          {/* ── Role Buttons ── */}
          <View style={styles.rolesContainer}>
            {/* Patient Button */}
            <View style={styles.roleWrapper}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "patient" && styles.roleButtonActive,
                ]}
                onPress={() => setRole("patient")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "patient" && styles.roleTextActive,
                  ]}
                >
                  أنا مريض
                </Text>
              </TouchableOpacity>
              {role === "patient" && (
                <Text style={styles.description}>
                  تابع تحاليلك، واعرف حالتك، وخد نصايح مبنية على بياناتك.
                </Text>
              )}
            </View>

            {/* Doctor Button */}
            <View style={styles.roleWrapper}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "doctor" && styles.roleButtonActive,
                ]}
                onPress={() => setRole("doctor")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "doctor" && styles.roleTextActive,
                  ]}
                >
                  أنا دكتور
                </Text>
              </TouchableOpacity>
              {role === "doctor" && (
                <Text style={styles.description}>
                  راجع بيانات المرضى بسهولة، وتابع تطوّر حالتهم في أي وقت.
                </Text>
              )}
            </View>
          </View>

          {/* ── Start Button ── */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              disabled={!role}
              style={[styles.startButton, !role && styles.startButtonDisabled]}
              // onPress={() => navigation.replace("Home")}
              onPress={() =>
                navigation.replace(
                  role === "patient" ? "PatientSignupFlow" : "DoctorSignupFlow",
                )
              }
              activeOpacity={0.85}
            >
              <Text
                style={[styles.startText, !role && styles.startTextDisabled]}
              >
                ابدأ
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    paddingHorizontal: 24,
  },

  // ── Header ──
  headerSection: {
    paddingTop: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 12,
    writingDirection: "rtl",
  },
  subtitle: {
    fontSize: 15,
    color: "#555555",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
    writingDirection: "rtl",
  },

  // ── Role Buttons ──
  rolesContainer: {
    gap: 16,
    marginBottom: 20,
  },
  roleWrapper: {
    // Container for button + description
  },
  roleButton: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#7D0A0A",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7D0A0A",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  roleButtonActive: {
    backgroundColor: "#7D0A0A",
    borderColor: "#7D0A0A",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  roleText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#7D0A0A",
    writingDirection: "rtl",
  },
  roleTextActive: {
    color: "#FFFFFF",
  },

  // ── Description ──
  description: {
    marginTop: 12,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
    writingDirection: "rtl",
  },

  // ── Start Button ──
  bottomSection: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 605, 
  },
  startButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7D0A0A",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 65,
  },
  startButtonDisabled: {
    backgroundColor: "#7D0A0A",
    // shadowOpacity: 0.1,
    // elevation: 2,
    opacity: 0.2,
  },
  startText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  startTextDisabled: {
    color: "#FFFFFF",
  },
});
