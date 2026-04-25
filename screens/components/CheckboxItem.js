import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export default function CheckboxItem({ label }) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => setChecked(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    // ── Checkboxes ──
  checkboxList: {
    gap: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#999",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7D0A0A",
    borderColor: "#7D0A0A",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
    flex: 1,
    writingDirection: "rtl",
  },
});