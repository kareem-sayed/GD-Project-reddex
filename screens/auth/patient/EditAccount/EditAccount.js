import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import StackHeader from "../../../components/StackHeader";

export default function ResetPassword({ navigation }) {

    const [formData, setFormData] = useState({
        name: "",
        mail: "",
        phoneNumber: "",
        password: "",
    });

    const validateForm = () => {
        const { mail, password } = formData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mail || !emailRegex.test(mail)) return false;
        

        return true;
    };

    const handleLogin = () => {
        if (!validateForm()) {
        alert("تأكد من صحة البيانات");
        return;
        }
    
        alert("تم حفظ البيانات بنجاح");
    };

    const isValid = validateForm();

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
        <StackHeader navigation={navigation} title="تعديل معلومات الحساب" />
        

        
        <View style={styles.inputsContainer}>


            <InputField
            label= "الاسم"
            placeholder="الاسم الي عايز تعدله لو مش عايز اكتبه زي ما هو"
            value={formData.name}
            onChangeText={(val) =>
                setFormData({ ...formData, name: val })
            }
            keyboardType="default"
        />
            <InputField
            label="البريد الإلكتروني"
            placeholder="البريد الإلكتروني"
            value={formData.mail}
            onChangeText={(val) =>
                setFormData({ ...formData, mail: val })
            }
            keyboardType="email-address"
        />
            <InputField
            label="رقم التلفون"
            placeholder="رقم تلفونك "
            value={formData.phoneNumber}
            onChangeText={(val) =>
                setFormData({ ...formData, phoneNumber: val })
            }
            keyboardType="phone-pad"
            />
            <InputField
                label="كلمة السر"
                placeholder="كلمة السر"
                value={formData.password}
                onChangeText={(val) =>
                setFormData({ ...formData, password: val })
                }
                secureTextEntry
            />
            
            

            <View  style={styles.buttonBox}>
            <CustomButton
                title=" حفظ التعديلات"
                onPress={handleLogin}
                disabled={!isValid}
            />
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