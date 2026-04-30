import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'right',
  },
});

export default SectionTitle;
