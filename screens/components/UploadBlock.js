import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function UploadBlock({ label, formats, file, onPress, required, optional }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.requiredBadge}>*</Text>}
        {optional && <Text style={styles.optionalBadge}>*</Text>}
      </View>

      <TouchableOpacity
        style={[styles.uploadBox, file && styles.uploadBoxFilled]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {file ? (
          <View style={styles.uploadSuccess}>
            <Text style={styles.uploadSuccessIcon}>✓</Text>
            <Text style={styles.uploadSuccessText}>{file.name}</Text>
          </View>
        ) : (
          <View style={styles.uploadEmpty}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>⬆</Text>
            </View>
            <Text style={styles.uploadFormats}>{formats}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "flex-end",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "right",
  },
  requiredBadge: {
    fontSize: 18,
    color: "#E74C3C",
    fontWeight: "bold",
  },
  optionalBadge: {
    fontSize: 18,
    color: "#7D0A0A",
    fontWeight: "bold",
  },
  uploadBox: {
    height: 100,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D0D0D0",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBoxFilled: {
    borderColor: "#4CAF50",
    backgroundColor: "#F1F8F4",
  },
  uploadEmpty: {
    alignItems: "center",
    gap: 8,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIconText: {
    fontSize: 20,
    color: "#666",
  },
  uploadFormats: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  uploadSuccess: {
    alignItems: "center",
    gap: 8,
  },
  uploadSuccessIcon: {
    fontSize: 32,
    color: "#4CAF50",
  },
  uploadSuccessText: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
    textAlign: "center",
  },
});