import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
export default function ProfileHeader({ navigation }) {
const [open, setOpen] = useState(false);

return (
    <View style={{ zIndex: 100 }}>
        
        {/* Header */}
        <View style={styles.header}>
            
            {/* Menu Button */}
            <TouchableOpacity onPress={() => setOpen(!open)}>
                <Ionicons name="ellipsis-vertical" size={22} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>الملف الشخصي</Text>

            {/* Back */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-forward" size={22} />
            </TouchableOpacity>

        </View>

      {/* Dropdown */}
        {open && (
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
                <View style={styles.menu}>
                <MenuItem title="تعديل الملف الشخصي" onPress={() => navigation.navigate("EditAccount")} />
                <MenuItem title="الإعدادات" onPress={() => navigation.navigate("profileSettings")} />
                <MenuItem title="المحفوظات" onPress={() => navigation.navigate("Saved")} />
                <MenuItem title="المساعدة" onPress={() => navigation.navigate("Help")} />
                </View>
            </Pressable>
        )}

    </View>
    );
}

function MenuItem({ title, onPress }) {
    return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
header: {
flexDirection: "row-reverse",
justifyContent: "space-between",
alignItems: "center",
padding: 15,
backgroundColor: "#fff",
elevation: 4
},

title: {
fontSize: 19,
fontWeight: "bold"
},

menu: {
    position: "absolute",
    top: 60,
    right: 10, // علشان RTL تبقى شمال
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,

    // Shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // Shadow Android
    elevation: 8,

    width: 180
},

item: {
paddingVertical: 10,
paddingHorizontal: 15
},

itemText: {
fontSize: 16
}
});