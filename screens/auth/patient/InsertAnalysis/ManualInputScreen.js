import { StyleSheet, View, StatusBar, ScrollView, Alert, Text } from 'react-native'
import React, { useState, useContext } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import ToggleButtons from '../../../components/Analysis/ToggleButtons'
import { PatientContext } from '../../../../backEnd/context/PatientContext'
import InputField from "../../../components/InputField"
import CustomButton from "../../../components/CustomButton"
import { manualDiagnosis ,bloodSmearDiagnosis, fusionDiagnosis} from '../../../../backEnd/api/services/aiApi'
import UploadBlock from '../../../components/UploadBlock'

export default function ManualInputScreen({ navigation }) {
    
    const { profile } = useContext(PatientContext);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState("manual");

    const [formData, setFormData] = useState({
        userId:  profile?.user?.id?.toString() || "",
        HGB: "", WBC: "", PLT: "", RBC: "", MCV: "", MCH: "", MCHC: "", HCT: "",
        NEUT_ABS: "", LYMP_ABS: "", MONO_ABS: "", EOS_ABS: "", BASO_ABS: "",
        bloodImage: null,
    });

    const pickDocument = async (fieldName) => {
            try {
                const result = await DocumentPicker.getDocumentAsync({
                    type: ["application/pdf", "image/*"],
                    copyToCacheDirectory: true,
                });
            
                if (!result.canceled) {
                    const file = result.assets[0];
            
                    setFormData((prev) => ({
                        ...prev,
                        [fieldName]: {
                            uri: file.uri,
                            name: file.name || `${fieldName}_file.png`,
                            type: file.mimeType || 'image/png',
                        },
                    }));
                }
            } catch (error) {
                console.log("Document error:", error);
            }
    };

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
        const userId = profile?.user?.id?.toString() || "";

        if (!userId) {
            Alert.alert("خطأ", "عفواً، لم يتم العثور على معرف المريض.");
            return;
        }

        // 1. فلترة الأرقام الحقيقية (بنتجاهل أي مسافة أو حقل فاضي)
        const tabularPayload = { userId: userId };
        let hasTabularData = false;

        fieldsConfig.forEach(field => {
            const val = formData[field.key];
            if (val !== undefined && val !== null && val.toString().trim() !== "") {
                tabularPayload[field.key] = Number(val.toString().trim());
                hasTabularData = true; // لو لقينا رقم واحد على الأقل، بنعتبر إن في داتا مانيوال
            }
        });

        const hasImage = !!formData.bloodImage;

        // 2. التحقق من وجود أي داتا قبل الإرسال
        if (!hasTabularData && !hasImage) {
            Alert.alert("تنبيه", "يرجى إدخال بيانات التحليل يدوياً أو رفع صورة الدم.");
            return;
        }

        setLoading(true);

        // تجهيز الـ FormData الأساسية (اللي هتحتاجها الصورة والدمج)
        const dataToSend = new FormData();
        dataToSend.append("userId", userId);

        try {
            let response;

            // تطبيق الشروط وتوجيه الـ Request بناءً على الـ EndPoint الصح
            if (hasTabularData && hasImage) {
                // 1. حالة الـ Fusion (رفع صورة + بيانات يدوية)
                dataToSend.append("blood_smear_image", formData.bloodImage);
                
                // الباك إند في الغالب بيستقبل الأرقام في الدمج كـ JSON String في حقل اسمه tabular_data
                dataToSend.append("tabular_data", JSON.stringify(tabularPayload));
                
                // (احتياطي) بنبعت الأرقام كحقول منفصلة عشان لو الباك إند بيقراها كده
                Object.keys(tabularPayload).forEach(key => {
                    dataToSend.append(key, tabularPayload[key]);
                });

                console.log("الـ EndPoint المحددة: Fusion (Manual + Smear)");
                response = await fusionDiagnosis(dataToSend);

            } else if (hasTabularData) {
                // 2. حالة المانيوال فقط (أرقام بدون صورة)
                console.log("الـ EndPoint المحددة: Manual Diagnosis");
                // مسار المانيوال مش بيحتاج FormData، بيتبعت JSON عادي جداً
                response = await manualDiagnosis(tabularPayload);

            } else {
                // 3. حالة الـ Blood Smear فقط (صورة بدون أرقام)
                dataToSend.append("blood_smear_image", formData.bloodImage);
                
                console.log("الـ EndPoint المحددة: Blood Smear");
                response = await bloodSmearDiagnosis(dataToSend);
            }

            console.log("تم استلام النتيجة بنجاح:", response.data);
            Alert.alert("تم بنجاح", "تم إرسال التحليل وجاري معالجة النتيجة!");
            
            navigation.navigate("AnalysisResultScreen", { result: response.data });

        } catch (error) {
            console.error("خطأ أثناء الرفع والتحليل:", error);
            
            // سحب رسالة الإيرور التفصيلية من الباك إند عشان نعرف لو في مشكلة
            const errorDetail = error.response?.data?.detail;
            const errorMsg = typeof errorDetail === 'string' ? errorDetail : 
                JSON.stringify(errorDetail) || 
                error.response?.data?.message || 
                "حدث خطأ أثناء رفع البيانات، يرجى المحاولة لاحقاً.";
                
            Alert.alert("فشل التحليل", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // التحقق من صحة الفورم عشان زرار الإرسال
    const isFormValid = fieldsConfig.some(field => formData[field.key]?.toString().trim() !== "") || formData.bloodImage !== null;
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

                    <View style={styles.textContainer}>
                        <Text style={styles.sectionTitle}>ارفع صورة مسحة الدم (Blood Smear)</Text> 
                    </View>
                    
                    <View style={styles.UploadContainer}>
                        <UploadBlock
                            label=" "
                            formats="JPG, PNG"
                            optional
                            file={formData.bloodImage}
                            onPress={() => pickDocument("bloodImage")}
                        />
                    </View> 

                    
                </View>
            </ScrollView>
            <View style={styles.buttonBox}>
                        <CustomButton
                            title={loading ? "جاري الإرسال..." : "إرسال التحليل"}
                            onPress={handleSendAnalysis}
                            disabled={!isFormValid || loading}
                        />
            </View>
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
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    inputWrapper: {
        marginBottom: 15,
    },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    UploadContainer: {
        width: "90%", 
        marginHorizontal: 20,
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 17, 
        color: "#111111", 
        fontWeight: "bold"
    },
}) 