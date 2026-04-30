import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import ToggleButtons from '../../../components/Analysis/ToggleButtons'
import UploadBlock from '../../../components/UploadBlock'
import * as DocumentPicker from "expo-document-picker";
import CustomButton from '../../../components/CustomButton'

export default function UploadFileScreen({navigation}) {
    const [selected, setSelected] = useState("upload");
    const [formData, setFormData] = useState({
        AnalysisImage: null,
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
                name: file.name,
                type: file.mimeType,
            },
            }));
        }
        } catch (error) {
        console.log("Document error:", error);
        }
    };

    const handleLogin = () => {
        // if (!validateForm()) {
        // alert("تأكد من صحة البيانات");
        // return;
        // }
    
        alert("تم حفظ البيانات بنجاح");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="افهم تحليلك" />
            <ToggleButtons selected={selected} onSelect={handleSelect} />

            <View style={styles.textContainer}>
                <Text style={{ fontSize: 19, color: "#111111", fontWeight: "bold" }}>
                    ارفع التحليل  
                </Text> 
                
            </View>

            <View style={styles.UploadContainer}>
                <UploadBlock
                    label="  "
                    formats="PDF, JPG, PNG"
                    optional
                    file={formData.AnalysisImage}
                    onPress={() => pickDocument("AnalysisImage")}
                    />
            </View> 
            <View  style={styles.buttonBox}>
                        <CustomButton
                            title=" تحليل"
                            onPress={handleLogin}
                            // disabled={!isValid}
                        />
            </View>
            
            
        </SafeAreaView>     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "right",
        backgroundColor: "#FAF7F2",
        },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: "center",
        width: "100%",
        height: 40,
        flexDirection:"row",
    },
    UploadContainer: {
        width: "90%", 
        marginHorizontal: 20,

    },
    buttonBox: {
        marginTop: 250,
        marginHorizontal: 15,
    },
})