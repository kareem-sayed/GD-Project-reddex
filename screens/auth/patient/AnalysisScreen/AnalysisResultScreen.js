import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import StackHeader from '../../../components/StackHeader'
import CustomButton from '../../../components/CustomButton'

export default function ResultScreen({ route, navigation }) {
    const apiResponse = route?.params?.result || {};

    // 1. سحب التقرير الطبي وملخص الطبيب
    const reportText = apiResponse?.final_report || apiResponse?.patient_report || ""; 
    const doctorSummary = apiResponse?.doctor_summary || ""; // سحب ملخص الدكتور

    // 2. سحب النصائح بذكاء 
    let recommendationsList = [];
    let recommendationsTitle = "خطة الرعاية والتوصيات";

    if (Array.isArray(apiResponse?.recommendations)) {
        recommendationsList = apiResponse.recommendations;
    } else if (apiResponse?.recommendations?.items && Array.isArray(apiResponse.recommendations.items)) {
        recommendationsList = apiResponse.recommendations.items;
        if (apiResponse.recommendations.title) {
            recommendationsTitle = apiResponse.recommendations.title;
        }
    }

    // دالة تنسيق النص العادي والكلمات العريضة (Bold)
    const renderFormattedText = (text) => {
        if (!text) return null;
        
        const blocks = text.split('\n\n');
        
        return blocks.map((block, index) => {
            let cleanBlock = block.replace(/### /g, '').replace(/## /g, '').trim();
            if (!cleanBlock) return null;

            const parts = cleanBlock.split(/(\*\*.*?\*\*)/g);

            return (
                <Text key={`text-${index}`} style={styles.paragraph}>
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                                <Text key={`bold-${i}`} style={styles.boldText}>
                                    {part.replace(/\*\*/g, '')}
                                </Text>
                            );
                        }
                        let normalText = part.replace(/(^\*|\*$)/g, '');
                        return <Text key={`normal-${i}`}>{normalText}</Text>;
                    })}
                </Text>
            );
        });
    };

    // الدالة السحرية للتقطيع
    const getReportCards = (text) => {
        if (!text) return [];
        
        const blocks = text.split('\n\n').filter(b => b.trim() !== '');
        const cards = [];
        let currentCard = null;

        blocks.forEach((block) => {
            let blockText = block.trim();
            if (blockText.startsWith('*') && !blockText.startsWith('**')) blockText = blockText.substring(1).trim();
            if (blockText.endsWith('*') && !blockText.endsWith('**')) blockText = blockText.slice(0, -1).trim();

            let title = null;
            let content = blockText;

            const hashMatch = blockText.match(/^(?:#{2,3})\s*(.+)/);
            const boldMatch = blockText.match(/^\*\*([^*]+)\*\*([\s\S]*)/);
            const colonMatch = blockText.match(/^([^\n]+):(?:\n| )([\s\S]*)/);

            if (hashMatch && !blockText.includes('\n')) {
                 title = hashMatch[1].replace(/:/g, '').replace(/\*/g, '').trim();
                 content = "";
            } else if (hashMatch && blockText.includes('\n')) {
                 const firstNewLine = blockText.indexOf('\n');
                 title = blockText.substring(0, firstNewLine).replace(/#/g, '').replace(/:/g, '').replace(/\*/g, '').trim();
                 content = blockText.substring(firstNewLine + 1).trim();
            } else if (boldMatch) {
                 title = boldMatch[1].replace(/:/g, '').trim();
                 content = boldMatch[2].trim();
            } else if (colonMatch && colonMatch[1].length < 40) {
                 title = colonMatch[1].replace(/\*/g, '').trim();
                 content = colonMatch[2].trim();
            }

            if (title) {
                currentCard = { title: title, content: content };
                cards.push(currentCard);
            } else {
                if (currentCard) {
                    currentCard.content += (currentCard.content ? '\n\n' : '') + content;
                } else {
                    currentCard = { title: "التقرير الطبي", content: content };
                    cards.push(currentCard);
                }
            }
        });

        return cards.filter(c => {
            // 1. نتأكد إن الكارت مش فاضي
            const hasContent = c.content.trim() || c.title?.trim();
            
            // 2. نصطاد كارت ملاحظة الطبيب ونعمله استبعاد (false)
            const isNotDoctorNote = !(c.title && c.title.includes('ملاحظة للطبيب'));
            
            // 3. نرجع الكارت بس لو فيه محتوى ومكنش هو ملاحظة الطبيب
            return hasContent && isNotDoctorNote;
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
                {/* 1. قسم ملخص الطبيب (بيظهر في الأول لو موجود) */}
                {doctorSummary ? (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionOuterTitle}>ملخص للطبيب المعالج</Text>
                        <View style={styles.summaryCard}>
                            <View style={styles.cardHeaderRow}>
                                <Text style={styles.summaryCardTitle}>🩺 نظرة عامة</Text>
                            </View>
                            <View style={styles.divider} />
                            <Text style={styles.paragraph}>{doctorSummary}</Text>
                        </View>
                    </View>
                ) : null}

                {/* 2. قسم التقرير الطبي التحليلي */}
                {reportText ? (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionOuterTitle}>التقرير الطبي التحليلي</Text>
                        
                        {getReportCards(reportText).map((card, index) => {
                            const isDanger = card.title && (
                                card.title.includes('خطورة') || 
                                card.title.includes('الشدة') || 
                                card.title.includes('المشتبه')
                            );
                            
                            return (
                                <View key={`report-card-${index}`} style={styles.splitReportCard}>
                                    {card.title && (
                                        <>
                                            <View style={styles.cardHeaderRow}>
                                                <Text style={[styles.cardHeaderTitle, isDanger && { color: '#D32F2F' }]}>
                                                    {card.title}
                                                </Text>
                                            </View>
                                            <View style={styles.divider} />
                                        </>
                                    )}
                                    <View style={styles.reportContent}>
                                        {renderFormattedText(card.content)}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                ) : null}

                {/* 3. قسم النصائح */}
                {recommendationsList.length > 0 && (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionOuterTitle}>{recommendationsTitle}</Text>
                        
                        {recommendationsList.map((tip, index) => {
                            const cleanTip = tip.replace(/^\d+\.\s*/, '').replace(/^-\s*/, ''); 
                            
                            return (
                                <View key={`tip-${index}`} style={styles.splitReportCard}>
                                    <View style={styles.tipRow}>
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
                                </View>
                            )
                        })}
                    </View>
                )}

                {/* نص الإخلاء */}
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
    container: { flex: 1, backgroundColor: "#FAF7F2" },
    scrollContainer: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 15, paddingBottom: 110 },
    sectionContainer: { marginBottom: 20 },
    sectionOuterTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', textAlign: 'right', marginBottom: 12, marginRight: 5 },
    
    // ستايل كارت ملخص الدكتور (مميز شوية)
    summaryCard: {
        backgroundColor: '#E8F4FD', // لون أزرق فاتح جداً عشان يميزه للدكتور
        borderRadius: 12, padding: 16, marginBottom: 12, 
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, 
        shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#D0E3F3'
    },
    summaryCardTitle: { fontSize: 16, fontWeight: '900', color: '#0277BD' },

    splitReportCard: {
        backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, 
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, 
        shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#F0F0F0'
    },
    cardHeaderRow: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 },
    cardHeaderTitle: { fontSize: 16, fontWeight: '900', color: '#333' },
    divider: { height: 1, backgroundColor: '#EAEAEA', marginBottom: 12 },
    reportContent: { alignItems: 'flex-end' },
    
    singleTipCard: {
        backgroundColor: '#FCF8F3', borderRadius: 12, padding: 16, marginBottom: 10, 
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, 
        shadowRadius: 2, elevation: 1
    },
    tipRow: { flexDirection: 'row-reverse', alignItems: 'flex-start' },
    sparkIconBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FDECCB', justifyContent: 'center', alignItems: 'center', marginLeft: 0 },
    sparkIcon: { fontSize: 16 },
    tipText: { flex: 1, fontSize: 14, color: '#444', lineHeight: 24, textAlign: 'right' },
    
    paragraph: { fontSize: 14, color: '#555', lineHeight: 26, textAlign: 'right', marginBottom: 8, writingDirection: 'rtl' },
    boldText: { fontWeight: '900', color: '#222' },
    disclaimerText: { textAlign: 'center', fontSize: 12, color: '#999', lineHeight: 20, marginTop: 10, marginBottom: 20 },
    fixedButtonBox: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FAF7F2', paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#EEE' },
});