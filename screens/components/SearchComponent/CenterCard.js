import React, { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PRIMARY = '#8B1A1A';

// 👈 استقبلنا onPress هنا
const CenterCard = memo(({ center, onSavePress, onPress }) => {
  const [saved, setSaved] = useState(center.isSaved || false);

  const handleSave = () => {
    setSaved((prev) => !prev);
    if (onSavePress) onSavePress(center.id, !saved);
  };

  return (
    // 👈 غيرنا الـ View لـ TouchableOpacity عشان الكارت كله ينفع يتداس عليه
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      <Image
        source={center.image} 
        style={styles.logo}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={1}>{center.name}</Text>

      <TouchableOpacity
        style={[styles.saveBtn, saved && styles.saveBtnActive]}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={[styles.saveText, saved && styles.saveTextActive]}>
          {saved ? '✓ محفوظ' : 'حفظ'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8, 
  },
  saveBtn: {
    marginTop: 8,
    width: '100%',
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: 'center',
  },
  saveBtnActive: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },
  saveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  saveTextActive: {
    color: PRIMARY,
  },
});

export default CenterCard;