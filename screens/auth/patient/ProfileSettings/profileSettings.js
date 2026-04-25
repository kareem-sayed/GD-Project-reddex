import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import StackHeader from "../../../components/StackHeader";


export default function ProfileSettings({ navigation }) {  
    const [notifications, setNotifications] = useState(false);
    
    return (
        <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
                <StackHeader navigation={navigation} title="اعدادات الحساب" />
                <Text style={styles.sectionTitle}>التفضيلات</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                    <Text style={styles.text}>الإشعارات</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: "#767577", true: "#784847" }}
                        thumbColor={notifications ? "#fff" : "#f4f3f4"}
                    />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>الحساب</Text>
                
                {/* ====== Section: Account ====== */}
                <View style={styles.card }>
                    <TouchableOpacity style={styles.row,{flexDirection: "row-reverse",justifyContent: "space-between",}}>
                    <Ionicons name="log-out-outline" size={25} color="red" />
                    <Text style={[styles.text, { color: "red" }]}>تسجيل خروج</Text>
                    </TouchableOpacity>
                </View>

                {/* ====== Edit Account ====== */}
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate("EditAccount")}
                >
                    <Ionicons name="chevron-back" size={20} />
                    <Text style={styles.text}>تعديل معلومات الحساب</Text>
                </TouchableOpacity>

        </SafeAreaView>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "right",
        backgroundColor: "#FAF7F2",
        },
    sectionTitle: {
        fontSize: 17,
        color: "#888",
        margin:10,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,

        elevation: 2,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    text: {
        fontSize: 16,
    },

    

    editBtn: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,

        elevation: 2,
    },

},)