import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  I18nManager
} from 'react-native';


import Header from '../../../components/chatBot/Header';
import MessageBubble from '../../../components/chatBot/MessageBubble';
import InputBar from '../../../components/chatBot/InputBar';
import TypingIndicator from '../../../components/chatBot/TypingIndicator';
import EmptyState from '../../../components/chatBot/EmptyState';


import { PatientContext } from '../../../../backEnd/context/PatientContext';
import {sendMessage} from '../../../../backEnd/api/services/chatApi';

I18nManager.forceRTL(true);

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef(null);
    
    
    const { profile } = useContext(PatientContext);

    // تثبيت الـ session_id طول ما المريض جوة الشاشة، ويتغير لو خرج ورجع
    const sessionIdRef = useRef(`session_${profile?.id || 'guest'}_${Date.now()}`);

    const scrollToBottom = () => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // تجهيز الـ Payload المطابق تماماً للباك-إند
            const requestData = {
                query: text.trim(),
                session_id: sessionIdRef.current, 
                // ✅ هنا هيجرب يقرأ الـ id بتاع المريض، لو مش موجود هيقرأ الـ userId اللي جوه الـ user
                userId: profile?.id?.toString() || profile?.user?.id?.toString() || ""
            };

            console.log("Request Payload:", requestData);

            const response = await sendMessage(requestData); 
            // console.log("API Response:", response);
            
            // ✅ كده هيقرأ حقل answer اللي راجع جوه الـ data من الأكسيوس فوراً
            const botReplyText = response?.data?.answer || response?.answer || "عذراً، لم أستطع معالجة طلبك حالياً.";
          
            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: botReplyText,
                sender: 'bot',
                timestamp: new Date(),
            };
            
            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            // ✅ السطر ده هيطبع لك تفاصيل الـ Validation اللي راجعة من الباك إند بالظبط
           console.log("Chatbot Error Details:", JSON.stringify(error.response?.data, null, 2));
            
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "واجهت مشكلة في الاتصال بالخادم، برجاء المحاولة لاحقاً.",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderItem = ({ item }) => <MessageBubble message={item} />;

    const renderFooter = () => {
        if (!isTyping) return null;
        return <TypingIndicator />;
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {messages.length === 0 && !isTyping ? (
                    <EmptyState />
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        ListFooterComponent={renderFooter}
                        onContentSizeChange={scrollToBottom}
                        showsVerticalScrollIndicator={false}
                    />
                )}
                <InputBar onSend={handleSend} />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F0E8',
    },
    flex: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
});