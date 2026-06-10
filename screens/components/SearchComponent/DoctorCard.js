import React, { memo, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PRIMARY = '#8B1A1A';

const DoctorCard = memo(({ doctor, variant = 'horizontal', onFollowPress, onPress }) => {
  // 👈 غيرنا الـ State عشان تاخد الـ Status كـ String بدل Boolean
  const [status, setStatus] = useState(doctor.followUpStatus || 'NOT_FOLLOWED');

  // 👈 لو الباك إند حدث الداتا من بره، الكارت يحس بيها أوتوماتيك
  useEffect(() => {
    setStatus(doctor.followUpStatus || 'NOT_FOLLOWED');
  }, [doctor.followUpStatus]);

  const handleFollow = () => {
    // 👈 بنخلي الحالة "انتظار" بشكل مبدئي (Optimistic Update) لحد ما الريكويست يخلص
    setStatus('PENDING'); 
    
    // 👈 بنبعت للـ Parent إن اليوزر داس، وبنبعتله الـ id
    if (onFollowPress) onFollowPress(doctor.id);
  };

  const getImageSource = (img) => {
    if (!img) return { uri: 'https://randomuser.me/api/portraits/men/32.jpg' };
    if (typeof img === 'string') return { uri: img }; 
    return img; 
  };

  // 👈 فانكشن بتحدد النص بتاع الزرار بناءً على الحالة
  const getButtonText = () => {
    switch (status) {
      case 'PENDING':
        return '⏳ قيد الانتظار';
      case 'FOLLOWED': // أو 'ACCEPTED' حسب ما الباك إند بيسميها
        return '✔️ تم المتابعة';
      default:
        return 'متابعة';
    }
  };

  // 👈 فانكشن بتحدد ستايل الزرار بناءً على الحالة
  const getButtonStyle = () => {
    switch (status) {
      case 'PENDING':
        return [styles.followBtn, styles.followBtnPending];
      case 'FOLLOWED':
        return [styles.followBtn, styles.followBtnActive];
      default:
        return styles.followBtn;
    }
  };

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity style={styles.hCard} onPress={onPress} activeOpacity={0.9}>
        <Image
          source={getImageSource(doctor.image)} 
          style={styles.hImage}
          resizeMode="cover"
        />
        <Text style={styles.hName} numberOfLines={1}>{doctor.name}</Text>
        <Text style={styles.hSpecialty} numberOfLines={1}>{doctor.specialty}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gCard} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={getImageSource(doctor.image)} 
        style={styles.gImage}
        resizeMode="cover"
      />
      <Text style={styles.gName} numberOfLines={1}>{doctor.name}</Text>
      <Text style={styles.gSpecialty} numberOfLines={1}>{doctor.specialty}</Text>
      
      <TouchableOpacity
        style={getButtonStyle()} // 👈 الستايل بيتحدد ديناميكياً
        onPress={handleFollow}
        activeOpacity={0.8}
        // 👈 بنقفل الزرار لو هو قيد الانتظار أو متبوع بالفعل
        disabled={status === 'PENDING' || status === 'FOLLOWED'} 
      >
        <Text style={[styles.followText, status !== 'NOT_FOLLOWED' && styles.followTextActive]}>
          {getButtonText()} {/* 👈 النص بيتحدد ديناميكياً */}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
