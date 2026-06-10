import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import CustomButton from '../../../components/CustomButton'

export default function ResultScreen({ route, navigation }) {
    const apiResponse = route?.params?.result || {};

    const finalReport = apiResponse?.final_report || "";
    const recommendationsTitle = apiResponse?.recommendations_title || "نصائح الذكاء الاصطناعي";
    const recommendationsList = apiResponse?.recommendations_list || [];

    // 🌟 الدالة السحرية لتحويل الـ Markdown وتلوين العناوين بخط عريض
    const renderFormattedText = (text) => {
        if (!text) return null;
        
        const blocks = text.split('\n\n');
        
        return blocks.map((block, index) => {
            let cleanBlock = block.replace(/## /g, '').trim();
            if (!cleanBlock) return null;

            const parts = cleanBlock.split(/(\*\*.*?\*\*)/g);

            return (
                <Text key={index} style={styles.paragraph}>
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                                <Text key={i} style={styles.boldText}>
                                    {part.replace(/\*\*/g, '')}
                                </Text>
                            );
                        }
                        return <Text key={i}>{part}</Text>;
                    })}
                </Text>
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <StackHeader navigation={navigation} title="نتيجة التحليل" />

            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                showsVerticalScrollIndicator={false}
            >
                {/* 1. قسم نصائح الذكاء الاصطناعي (العنوان برة الكارت زي الصورة) */}
                {recommendationsList.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionOuterTitle}>{recommendationsTitle}</Text>
                        
                        <View style={styles.tipsCard}>
                            {recommendationsList.map((tip, index) => {
                                const cleanTip = tip.replace(/^\d+\.\s*/, ''); 
                                return (
                                    <View key={index} style={styles.tipRow}>
                                        {/* التريكة: الأيقونة بتظهر جنب أول عنصر بس */}
                                        {index === 0 && (
                                            <View style={styles.sparkIconBox}>
                                                <Text style={styles.sparkIcon}>✨</Text>
                                            </View>
                                        )}
                                        <Text style={[styles.tipText, index === 0 && { marginRight: 12 }]}>
                                            <Text style={styles.boldText}>{index + 1}. </Text>
                                            {renderFormattedText(cleanTip)}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )}

                {/* 2. كارت التقرير الطبي التحليلي (مطابق للصورة بالخط الرمادي) */}
                {finalReport ? (
                    <View style={styles.reportCard}>
                        <Text style={styles.reportMainTitle}>التقرير الطبي التحليلي</Text>
                        
                        {/* الخط الرمادي الفاصل */}
                        <View style={styles.divider} />

                        {/* محتوى التقرير */}
                        <View style={styles.reportContent}>
                            {renderFormattedText(finalReport)}
                        </View>
                    </View>
                ) : null}

                {/* نص الإخلاء أسفل الشاشة */}
                <Text style={styles.disclaimerText}>
                    هذا التقييم إرشادي ويعتمد على نتائج التحليل فقط.{'\n'}ويُنصح بالمتابعة الطبية الدورية حسب الحالة.
                </Text>

            </ScrollView>

            {/* الزرار الثابت */}
            <View style={styles.fixedButtonBox}>
                <CustomButton
                    title="+ تحليل جديد"
                    onPress={() => navigation.navigate("ManualInputScreen")}
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
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 110, // عشان الزرار ميغطيش على الكلام
    },
    
    /* ستايلات قسم النصائح */
    sectionContainer: {
        marginBottom: 15,
    },
    sectionOuterTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'right',
        marginBottom: 10,
        marginRight: 5,
    },
    tipsCard: {
        backgroundColor: '#FCF8F3', // لون بيج فاتح مطابق للصورة
        borderRadius: 12,
        padding: 16,
    },
    tipRow: {
        flexDirection: 'row-reverse', // عشان يبدأ من اليمين
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    sparkIconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FDECCB', // خلفية برتقالي فاتح للأيقونة
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
    },
    sparkIcon: {
        fontSize: 16,
    },
    tipText: {
        flex: 1,
        fontSize: 13,
        color: '#444',
        lineHeight: 24,
        textAlign: 'right',
    },

    /* ستايلات كارت التقرير */
    reportCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    reportMainTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', // العنوان في النص
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#EAEAEA', // الخط الرمادي
        marginBottom: 16,
    },
    reportContent: {
        alignItems: 'flex-end',
    },

    /* ستايلات النصوص والدالة السحرية */
    paragraph: {
        fontSize: 13,
        color: '#555',
        lineHeight: 24,
        textAlign: 'right',
        marginBottom: 12, 
        writingDirection: 'rtl',
    },
    boldText: {
        fontWeight: '900', // تخانة الخط للعناوين
        color: '#222',
    },

    /* ستايل نص الإخلاء */
    disclaimerText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#999',
        lineHeight: 18,
        marginTop: 10,
        marginBottom: 20,
    },

    /* الزرار الثابت في الأسفل */
    fixedButtonBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FAF7F2', 
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#EEE',
    },
})
