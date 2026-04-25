import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
export default function QuestionBlock({ question, selected, onSelect }) {
  return (
    <View style={styles.questionBlock}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.radioRow}>
        <RadioButton
          label="لا"
          selected={selected === "no"}
          onPress={() => onSelect("no")}
        />
        <RadioButton
          label="أه"
          selected={selected === "yes"}
          onPress={() => onSelect("yes")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    // ── Questions ──
  questionsContainer: {
    gap: 24,
  },
  questionBlock: {
    gap: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    writingDirection: "rtl",
  },
});