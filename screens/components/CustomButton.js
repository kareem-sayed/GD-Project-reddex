import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({
  title,
  onPress,
  disabled = false,
  style,
  disabledStyle,
  textStyle,
  disabledTextStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        styles.nextButton,
        style,
        disabled && styles.nextButtonDisabled,
        disabled && disabledStyle,
      ]}
    >
      <Text
        style={[
          styles.nextText,
          textStyle,
          disabled && styles.nextTextDisabled,
          disabled && disabledTextStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#7D0A0A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b3939",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: "#7D0A0A",
    shadowOpacity: 0.1,
  },
  nextText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
  nextTextDisabled: {
    color: "#e3e6ec",
  },
});