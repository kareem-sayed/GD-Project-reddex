import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StackHeader({ navigation, title }) {
    return (
        
        <View style={styles.header}>
        
        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-forward" size={24} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Spacer (عشان يظبط النص في النص) */}
        
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