import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ضفنا onBackPress كـ Prop اختياري
export default function StackHeader({ navigation, title, onBackPress }) {
    return (
        <View style={styles.header}>
            {/* Back */}
            <TouchableOpacity 
                onPress={() => {
                    // لو باعتين onBackPress هينفذها، لو لأ هيعمل goBack العادية
                    if (onBackPress) {
                        onBackPress();
                    } else {
                        navigation.goBack();
                    }
                }}
            >
                <Ionicons name="arrow-forward" size={24} color="#000" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>{title}</Text>

            {/* Spacer (حطينا View فاضي بنفس عرض الأيقونة عشان النص يسنتر في النص بالظبط) */}
            <View style={{ width: 24 }} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#fff",
        elevation: 4,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    }
});