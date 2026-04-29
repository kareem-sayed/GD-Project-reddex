import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  I18nManager,
} from 'react-native';
import Header from '../../../components/chatBot/Header';
import MessageBubble from '../../../components/chatBot/MessageBubble';
import InputBar from '../../../components/chatBot/InputBar';
import TypingIndicator from '../../../components/chatBot/TypingIndicator';
import EmptyState from '../../../components/chatBot/EmptyState';

I18nManager.forceRTL(true);

const BOT_RESPONSES = [
    'الدوخة، الشعور بالانخفاض في ضغط الدم ممكن يكونوا مرتبطين بأكثر من سبب، زي الإرهاق، الجفاف، نقص بسيط في الهيموجلوبين (أنيميا)، أو انخفاض الضغط نفسه.\n\nلو الأعراض خفيفة وبتروح مع الراحة، حاول تشرب سوائل كفاية، تاكل وجبات منتظمة، وتقوم من الجلوس أو النوم بهدوء.\n\nلكن لو الدوخة مستمرة، أو بتحس بإغماء، أو ضربات قلب سريعة، يفضل تعمل تحليل دم وتقيس الضغط وتراجع طبيب للاطمئنان.\n\nهل بتحس بتعب مستمر أو ضيق في النفس؟\n(سؤالي ده بين عشان أفهم حالتك أكثر، ومش بديل عن زيارة الطبيب)',
    'ممكن يكون ده بسبب انخفاض ضغط الدم أو التعب العام. حاول تاخد راحة كافية وتشرب ميه بكميات كافية. لو الأعراض استمرت أكثر من يومين، يفضل تراجع طبيب.',
    'ده ممكن يكون علامة على أكثر من حاجة. محتاج أعرف أكثر عن الأعراض اللي بتحس بيها. هل عندك تعب عام أو صداع مع الدوخة؟',
];

let botResponseIndex = 0;

const getBotResponse = () => {
    const response = BOT_RESPONSES[botResponseIndex % BOT_RESPONSES.length];
    botResponseIndex++;
    return response;
};

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef(null);

    const scrollToBottom = () => {
        if (flatListRef.current && messages.length > 0) {
        flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text) => {
        if (!text.trim()) return;

        const userMessage = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'user',
        timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        const delay = 1200 + Math.random() * 800;
        setTimeout(() => {
        const botMessage = {
            id: (Date.now() + 1).toString(),
            text: getBotResponse(),
            sender: 'bot',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        }, delay);
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
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
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
