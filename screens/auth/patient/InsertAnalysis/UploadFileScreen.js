import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import ToggleButtons from '../../../components/Analysis/ToggleButtons'
import UploadBlock from '../../../components/UploadBlock'
import * as DocumentPicker from "expo-document-picker";
import CustomButton from '../../../components/CustomButton'
import { PatientContext } from '../../../../backEnd/context/PatientContext';

// استيراد الفانكشنز الخاصة بك
import { labReportDiagnosis, bloodSmearDiagnosis, fusionDiagnosis } from '../../../../backEnd/api/services/aiApi' 

export default function UploadFileScreen({ navigation }) {
    const { profile } = useContext(PatientContext); 
    const [selected, setSelected] = useState("upload");
    const [loading, setLoading] = useState(false); 

    const [formData, setFormData] = useState({
        AnalysisImage: null, // هيروح تحت باسم lab_report_image
        bloodImage: null,    // هيروح تحت باسم blood_smear_image
    });

    const handleSelect = (type) => {
        setSelected(type);
        if (type === "manual") {
            navigation.replace("ManualInputScreen");
        }
    };

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

    // الـ Logic الذكي والمطابق تماماً للـ Swagger
    const handleSendAnalysis = async () => {
        const userId =  profile?.user?.id?.toString() || "";
        
        if (!userId) {
            Alert.alert("خطأ", "عفواً، لم يتم العثور على معرف المريض.");
            return;
        }

        if (!formData.AnalysisImage && !formData.bloodImage) {
            Alert.alert("تنبيه", "برجاء رفع ملف واحد على الأقل للتحليل.");
            return;
        }

        setLoading(true);

        // تجهيز الـ FormData
        const dataToSend = new FormData();
        dataToSend.append("userId", userId);

        try {
            let response;

            // تطبيق الشروط والـ Keys بناءً على الـ Swagger المرفق بالظبط
            if (formData.AnalysisImage && formData.bloodImage) {
                // 1. حالة الـ Fusion (رفع الاثنين معاً)
                dataToSend.append("blood_smear_image", formData.bloodImage);
                dataToSend.append("lab_report_image", formData.AnalysisImage);
                
                console.log("الـ الـ EndPoint المحددة: Fusion");
                response = await fusionDiagnosis(dataToSend);

            } else if (formData.AnalysisImage) {
                // 2. حالة الـ Lab Report فقط
                dataToSend.append("lab_report_image", formData.AnalysisImage);
                
                console.log("الـ الـ EndPoint المحددة: Lab Report");
                response = await labReportDiagnosis(dataToSend);

            } else {
                // 3. حالة الـ Blood Smear فقط
                dataToSend.append("blood_smear_image", formData.bloodImage);
                
                console.log("الـ الـ EndPoint المحددة: Blood Smear");
                response = await bloodSmearDiagnosis(dataToSend);
            }

            console.log("تم استلام النتيجة بنجاح:", response.data);
            Alert.alert("تم بنجاح", "تم رفع التحليل وجاري معالجة النتيجة!");
            
            // هنا التوجيه لصفحة النتيجة كمثال:
            navigation.navigate("AnalysisResultScreen", { result: response.data });

        } catch (error) {
            console.error("خطأ أثناء الرفع والتحليل:", error);
            const errorMsg = error.response?.data?.message || "حدث خطأ أثناء رفع الملفات، يرجى المحاولة لاحقاً.";
            Alert.alert("فشل التحليل", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.AnalysisImage || formData.bloodImage;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="افهم تحليلك" />
            <ToggleButtons selected={selected} onSelect={handleSelect} />

            <View style={styles.textContainer}>
                <Text style={styles.sectionTitle}>ارفع تحليل المختبر (Lab Report)</Text> 
            </View>

            <View style={styles.UploadContainer}>
                <UploadBlock
                    label=" "
                    formats="PDF, JPG, PNG"
                    optional
                    file={formData.AnalysisImage}
                    onPress={() => pickDocument("AnalysisImage")}
                />
            </View> 

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

            <View style={styles.buttonBox}>
                <CustomButton
                    title={loading ? "جاري التحليل والرفع..." : "بدء التحليل"}
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
        backgroundColor: "#FAF7F2",
    },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    sectionTitle: {
        fontSize: 17, 
        color: "#111111", 
        fontWeight: "bold"
    },
    UploadContainer: {
        width: "90%", 
        marginHorizontal: 20,
        marginTop: 5,
    },
    buttonBox: {
        marginTop: 'auto', 
        marginBottom: 30,
        marginHorizontal: 20,
    },
})