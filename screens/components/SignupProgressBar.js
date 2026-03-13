import React from "react";
import { View, StyleSheet } from "react-native";

export default function SignupProgressBar({ currentStep, totalSteps = 5 }) {
  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index < currentStep
                ? styles.progressStepActive
                : styles.progressStepInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingTop: 10,
    width: "100%",
  },

  progressBar: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },

  progressStep: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },

  progressStepActive: {
    backgroundColor: "#7D0A0A",
  },

  progressStepInactive: {
    backgroundColor: "#E0E0E0",
  },
});