import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ToggleButtons({ selected, onSelect }) {
    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={[styles.button, selected === "manual" && styles.activeButton]}
                onPress={() => onSelect("manual")}
            >
                <Text style={[styles.text, selected === "manual" && styles.activeText]}>
                    إدخال يدوي
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, selected === "upload" && styles.activeButton]}
                onPress={() => onSelect("upload")}
            >
                <Text style={[styles.text, selected === "upload" && styles.activeText]}>
                    رفع ملف
                </Text>
            </TouchableOpacity>

        </View>
    );
}

    const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 4,
        width: "90%",
        alignSelf: "center",
        gap:2,
    
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    activeButton: {
        backgroundColor: "#EED7A8",
    },
    text: {
        fontSize: 16,
        color: "#999",
        fontWeight: "500",
    },
    activeText: {
        color: "#000",
        fontWeight: "600",
    },
    });