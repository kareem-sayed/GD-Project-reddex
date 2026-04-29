import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager, Platform } from 'react-native';

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={styles.menuButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, styles.menuLineShort]} />
        <View style={styles.menuLine} />
      </TouchableOpacity>
      <Text style={styles.title}>تشخيص الأعراض</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.arrow}>{'→'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F0E8',
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: '400',
  },
  menuButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 4,
  },
  menuLine: {
    width: 20,
    height: 1.5,
    backgroundColor: '#1A1A1A',
    borderRadius: 1,
    marginVertical: 2,
  },
  menuLineShort: {
    width: 14,
  },
});
