import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>حالـتك الصحية عاملة أي النهاردة</Text>
        <Text style={styles.subtitle}>
          تقدر تكتب كل حاجة حاسس بيها وانا هفهمك{'\n'}انت عندك أي بالظبط
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2A2A2A',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 30,
    writingDirection: 'rtl',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 14.5,
    color: '#8A8070',
    textAlign: 'center',
    lineHeight: 24,
    writingDirection: 'rtl',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
});
