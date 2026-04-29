import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export default function RadioButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={styles.radioContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.radioCircle, selected && styles.radioCircleSelected]}
      >
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  // ── Radio Buttons ──
  radioRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#999",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#7D0A0A",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7D0A0A",
  },
  radioLabel: {
    fontSize: 15,
    color: "#333",
    writingDirection: "rtl",
  },
});
