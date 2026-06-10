import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from "../../../components/StackHeader";
import React from 'react'
import { useContext } from 'react';
import { PatientContext } from '../../../../backEnd/context/PatientContext';

export default function Medicins({ navigation }) { 
    const { medications } = useContext(PatientContext);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title=" الادوية   " />

            <View style={styles.textContainer}>
                <Text style={{ fontSize: 17, color: "#111111", fontWeight: "bold" }}>
                    ادويتك الحالية
                </Text>
            </View>

            {/* الـ Card الآن متعرّف بشكل صحيح */}
            <View style={styles.card}>    
                <View style={styles.textContainer2}>
                    {medications && medications.allMedications && medications.allMedications.length > 0 ? (
                        medications.allMedications.map((item, index) => (
                            <View key={index} style={styles.medicineRow}>
                                <Text style={styles.medicineName}>{item.trim()}</Text>
                                <Text style={styles.subText}>
                                    1 كبسولة - مرة يوميًا
                                </Text>
                            </View> 
                        ))
                    ) : (
                        <Text style={styles.subText}>لا توجد أدوية مسجلة حالياً...</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF7F2",
    },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start", // يضمن بداية السطر من اليمين بسبب الـ RTL
    },
    card: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        marginTop: 10,
        padding: 15,
        borderRadius: 12,
        // إضفاء ظل خفيف لتبدو كبطاقة
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    textContainer2: {
        width: "100%",
    },
    medicineRow: {
        flexDirection: "row", 
        justifyContent: "space-between", // يوزع الاسم والجرعة بشكل شيك على السطر
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F0EFEA", // خط خفيف يفصل بين الأدوية
    },
    medicineName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    subText: {
        fontSize: 13,
        color: "#777",
    },
})