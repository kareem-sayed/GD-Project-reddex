import { StyleSheet, View, StatusBar, ScrollView, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import ToggleButtons from '../../../components/Analysis/ToggleButtons'
import { PatientContext } from '../../../../backEnd/context/PatientContext'
import InputField from "../../../components/InputField"
import CustomButton from "../../../components/CustomButton"
import { manualDiagnosis } from '../../../../backEnd/api/services/aiApi'

export default function ManualInputScreen({ navigation }) {
       
    const { profile } = useContext(PatientContext);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("manual");

    const [formData, setFormData] = useState({
        userId:  profile?.user?.id?.toString() || "",
        HGB: "", WBC: "", PLT: "", RBC: "", MCV: "", MCH: "", MCHC: "", HCT: "",
        NEUT_ABS: "", LYMP_ABS: "", MONO_ABS: "", EOS_ABS: "", BASO_ABS: ""
    });

    const fieldsConfig = [
        { key: 'HGB', label: 'HGB' }, { key: 'WBC', label: 'WBC' }, { key: 'PLT', label: 'PLT' },
        { key: 'RBC', label: 'RBC' }, { key: 'MCV', label: 'MCV' }, { key: 'MCH', label: 'MCH' },
        { key: 'MCHC', label: 'MCHC' }, { key: 'HCT', label: 'HCT' }, { key: 'NEUT_ABS', label: 'NEUT_ABS' },
        { key: 'LYMP_ABS', label: 'LYMP_ABS' }, { key: 'MONO_ABS', label: 'MONO_ABS' },
        { key: 'EOS_ABS', label: 'EOS_ABS' }, { key: 'BASO_ABS', label: 'BASO_ABS' },
    ];

    const handleSelect = (type) => {
        setSelected(type);
        if (type === "upload") {
            navigation.replace("UploadFileScreen");
        }
    };

    const handleSendAnalysis = async () => {
        if (!formData.userId) {
            Alert.alert("خطأ", "عفواً، لم يتم العثور على معرف المريض.");
            return;
        }

        setLoading(true);
        const payload = { ...formData };

        fieldsConfig.forEach(field => {
            if (payload[field.key] === "") {
                delete payload[field.key]; // حذف الحقل الفاضي تماماً ليقوم الـ Agent بالـ Imputation
            } else {
                payload[field.key] = Number(payload[field.key]);
            }
        });

        try {
            console.log("جاري إرسال البيانات للـ Agent:", payload);
            const response = await manualDiagnosis(payload);
            
            console.log("استجابة الـ AI بنجاح:", response.data);
            Alert.alert("تم بنجاح", "تم إرسال التحليل واستلام التشخيص بنجاح!");
            
            navigation.navigate("AnalysisResultScreen", { result: response.data });

        }catch (error) {
                console.error("خطأ أثناء الإرسال:", error);

                // السطرين دول هيجيبوا لك الـ URL اللي اتبعث عليه الـ Request بالملّي
                if (error.config) {
                    const fullURL = `${error.config.baseURL || ''}${error.config.url || ''}`;
                    console.log("🔗 الـ URL اللي اتبعث عليه الـ Request هو:", fullURL);
                }

                const errorMsg = error.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.";
                Alert.alert("فشل الإرسال", errorMsg);
            }finally {
                        setLoading(false);
                    }
    };

    const isFormValid = fieldsConfig.some(field => formData[field.key] !== "");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="افهم تحليلك" />
            <ToggleButtons selected={selected} onSelect={handleSelect} />
            
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.inputsContainer}>
                    
                    {fieldsConfig.map((field) => (
                        <View key={field.key} style={styles.inputWrapper}>
                            <InputField
                                label={field.label}
                                placeholder={`اكتب نتيجة تحليل ${field.label}`}
                                value={formData[field.key]}
                                onChangeText={(val) =>
                                    setFormData({ 
                                        ...formData, 
                                        [field.key]: val 
                                    })
                                }
                                keyboardType="numeric"
                            />
                        </View>
                    ))}

                    <View style={styles.buttonBox}>
                        <CustomButton
                            title={loading ? "جاري الإرسال..." : "إرسال التحليل"}
                            onPress={handleSendAnalysis}
                            disabled={!isFormValid || loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF7F2',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    inputsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    buttonBox: {
        marginTop: 20,
    },
    inputWrapper: {
        marginBottom: 15,
    },
}) 