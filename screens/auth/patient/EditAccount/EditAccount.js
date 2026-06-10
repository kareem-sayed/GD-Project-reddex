import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react'; // 👈 استوردنا useContext
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import StackHeader from "../../../components/StackHeader";
import { updateUserProfile } from "../../../../backEnd/api/services/patientApi";
import { PatientContext } from '../../../../backEnd/context/PatientContext'; // 👈 استوردنا الكونتكست

export default function ResetPassword({ navigation }) {
    // 1. هنجيب الداتا الحالية، ونجيب الدالة اللي بتحدث الـ Context (غالباً اسمها setProfile)
    const { profile, setProfile } = useContext(PatientContext);

    // 2. الـ ID بتاع اليوزر هنجيبه من الكونتكست مباشرةً
    const userId = profile?.user?.id; // 
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        mail: "",
        phoneNumber: "",
        password: "",
    });

    const validateForm = () => {
        const { mail } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (mail && !emailRegex.test(mail)) return false;
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            Alert.alert("خطأ", "تأكد من صحة البريد الإلكتروني");
            return;
        }

        const rawData = {
            name: formData.name,
            email: formData.mail,
            phone: formData.phoneNumber,
            password: formData.password,
        };

        const cleanData = Object.fromEntries(
            Object.entries(rawData).filter(([key, value]) => value !== "" && value !== null && value !== undefined)
        );

        if (Object.keys(cleanData).length === 0) {
            Alert.alert("تنبيه", "لم تقم بإدخال أي تعديلات لحفظها");
            return;
        }

        try {
            setIsLoading(true);
            
            // 3. بنبعت التعديل للباك إند
            const updatedUserResponse = await updateUserProfile(userId, cleanData);
            
            // 4. 🔥 السحر هنا: بنحدث الـ Context بالبيانات الجديدة 🔥
            // لو الفانكشن بتاعتك بترجع اليوزر الجديد بعد التعديل، اعمله set مباشرة:
            if(setProfile) {
                // ادمج الداتا القديمة مع التعديلات الجديدة جوه الكونتكست
                setProfile(prevProfile => ({
                    ...prevProfile,
                    ...cleanData
                }));
            }
            
            Alert.alert("نجاح", "تم حفظ البيانات بنجاح");
            
            // فضي الخانات أو ارجع للشاشة اللي فاتت
            setFormData({ name: "", mail: "", phoneNumber: "", password: "" });
            // navigation.goBack(); 

        } catch (error) {
            if (error.response && error.response.status === 409) {
                Alert.alert("عفواً", "البريد الإلكتروني أو رقم الهاتف مسجل بالفعل لحساب آخر.");
            } else {
                Alert.alert("خطأ", "حدثت مشكلة أثناء تحديث البيانات، حاول مرة أخرى.");
            }
            console.log("Error:", error.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    const isValid = validateForm();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="تعديل معلومات الحساب" />
            
            {/* ... باقي كود الـ UI بتاعك زي ما هو بالظبط ... */}
            <View style={styles.inputsContainer}>
                <InputField
                    label="الاسم"
                    placeholder="الاسم الي عايز تعدله "
                    value={formData.name}
                    onChangeText={(val) => setFormData({ ...formData, name: val })}
                    keyboardType="default"
                />
                <InputField
                    label="البريد الإلكتروني"
                    placeholder="البريد الإلكتروني"
                    value={formData.mail}
                    onChangeText={(val) => setFormData({ ...formData, mail: val })}
                    keyboardType="email-address"
                />
                <InputField
                    label="رقم التلفون"
                    placeholder="رقم تلفونك "
                    value={formData.phoneNumber}
                    onChangeText={(val) => setFormData({ ...formData, phoneNumber: val })}
                    keyboardType="phone-pad"
                />
                <InputField
                    label="كلمة السر"
                    placeholder="كلمة السر"
                    value={formData.password}
                    onChangeText={(val) => setFormData({ ...formData, password: val })}
                    secureTextEntry
                />

                <View style={styles.buttonBox}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#8B1A1A" />
                    ) : (
                        <CustomButton
                            title="حفظ التعديلات"
                            onPress={handleSave}
                            disabled={!isValid}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}




    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "right",
         // x:16 من Figma
               // y:150 من Figma
        backgroundColor: "#FAF7F2",
        },
        stepTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#1A1A1A",
        marginTop: 15,
        marginBottom: 23,
        writingDirection: "rtl",
    },
    noteText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 24,
        writingDirection: "rtl",
    },
    linkText: {
        color: "#7D0A0A",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    inputsContainer: {
        gap: 18,
        paddingHorizontal: 20,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#D0D0D0",
        borderRadius: 10,
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#333",
        textAlign: "right",
    },

    helperText: {
        fontSize: 16,
        color: "#5b5a5a",
        marginTop: 7,
        marginBottom: 8,
        writingDirection: "rtl",
    },
    buttonBox: {
        marginTop: 90,
    },
    })