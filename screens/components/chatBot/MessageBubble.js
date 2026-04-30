import React from 'react';
import { View, Text, StyleSheet, I18nManager, Platform } from 'react-native';

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowBot]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {message.text}
        </Text>
      </View>
    </View>
  
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  rowUser: {
    justifyContent: 'flex-start',
  },
  rowBot: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 4,
    alignSelf: 'flex-start',
  },
  botBubble: {
    backgroundColor: '#E8D5B7',
    borderTopEndRadius: 4,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14.5,
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  userText: {
    color: '#2A2A2A',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  botText: {
    color: '#2A2A2A',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});
