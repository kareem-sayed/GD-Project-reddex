import React, { memo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PRIMARY = '#8B1A1A';

const DoctorCard = memo(({ doctor, variant = 'horizontal', onFollowPress }) => {
  const [followed, setFollowed] = useState(doctor.isFollowed || false);

  const handleFollow = () => {
    setFollowed((prev) => !prev);
    if (onFollowPress) onFollowPress(doctor.id, !followed);
  };

  if (variant === 'horizontal') {
    return (
      <View style={styles.hCard}>
        <Image
          source={{ uri: doctor.image }}
          style={styles.hImage}
          resizeMode="cover"
        />
        <Text style={styles.hName} numberOfLines={1}>{doctor.name}</Text>
        <Text style={styles.hSpecialty} numberOfLines={1}>{doctor.specialty}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>{doctor.rating}</Text>
          <Text style={styles.star}>⭐</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.gCard}>
      <Image
        source={{ uri: doctor.image }}
        style={styles.gImage}
        resizeMode="cover"
      />
      <Text style={styles.gName} numberOfLines={1}>{doctor.name}</Text>
      <Text style={styles.gSpecialty} numberOfLines={1}>{doctor.specialty}</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.ratingText}>{doctor.rating}</Text>
        <Text style={styles.star}>⭐</Text>
      </View>
      <TouchableOpacity
        style={[styles.followBtn, followed && styles.followBtnActive]}
        onPress={handleFollow}
        activeOpacity={0.8}
      >
        <Text style={[styles.followText, followed && styles.followTextActive]}>
          {followed ? '✓ يتم المتابعة' : 'متابعة'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  // Horizontal card
  hCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginLeft: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  hImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  hName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 2,
  },
  hSpecialty: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  star: {
    fontSize: 11,
  },

  // Grid card
  gCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  gImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  gName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 2,
  },
  gSpecialty: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
  followBtn: {
    marginTop: 8,
    width: '100%',
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: 'center',
  },
  followBtnActive: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },
  followText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  followTextActive: {
    color: PRIMARY,
  },
});

export default DoctorCard;
