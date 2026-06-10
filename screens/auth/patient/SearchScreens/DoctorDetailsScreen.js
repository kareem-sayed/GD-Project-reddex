import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  I18nManager,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps'; // 👈 استيراد جوجل ماب

import StackHeader from '../../../components/StackHeader';
import SectionTitle from '../../../components/SearchComponent/SectionTitle';

// إجبار التطبيق على اليمين لليسار
I18nManager.forceRTL(true);

const { width: SCREEN_W } = Dimensions.get('window');

const COLORS = {
  brand:        '#8B1A1A',   
  brandFaint:   '#F9EFEF',
  bg:           '#FAF7F2',   
  surface:      '#FFFFFF',
  border:       '#EDE8E0',
  textPrimary:  '#1C1917',
  textSecond:   '#57534E',
  divider:      '#F0EAE0',
};

// ─── مكون فرعي للسطور (عشان تترص يمين صح) ───
const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[s.infoRow, !isLast && s.infoRowBorder]}>
    <Text style={s.infoLabel}>{label} : </Text>
    <Text style={s.infoValue}>{value}</Text>
  </View>
);

const DoctorDetailsScreen = ({ navigation, route }) => {
  // استقبال الداتا
  const doctorData = route?.params?.doctorData ?? {};

  // 👈 هندسة الداتا الفاضية (لو مفيش داتا هيكتب 'غير محدد')
  const safeName = doctorData.name || 'دكتور غير محدد';
  const safeSpecialty = doctorData.specialty || 'تخصص غير محدد';
  const safeExperience = doctorData.experience || 'غير محدد';
  const safeImage = doctorData.image; 
  const safeClinicName = doctorData.clinicName || 'غير محدد';
  const safeClinicAddress = doctorData.clinicAddress || 'غير محدد';
  const safeWorkTime = doctorData.workTime || 'غير محدد';
  const safeWorkDays = doctorData.workDays || 'غير محدد';
  const safeExamPrice = doctorData.examinationPrice ? `${doctorData.examinationPrice} جنيه` : 'غير محدد';
  const safeConsultPrice = doctorData.consultationPrice ? `${doctorData.consultationPrice} جنيه` : 'غير محدد';

  const [following, setFollowing] = useState(false);

  const handleFollow = useCallback(() => {
    setFollowing((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <StackHeader 
        title="تفاصيل الطبيب" 
        onBackPress={() => navigation.goBack()} 
      />

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. كارت الدكتور (الصورة هتيجي يمين والكلام شمالها) */}
        <View style={s.profileCard}>
          <View style={s.avatarWrap}>
            {safeImage ? (
              <Image source={typeof safeImage === 'string' ? { uri: safeImage } : safeImage} style={s.avatar} resizeMode="cover" />
            ) : (
              <View style={[s.avatar, s.avatarFallback]}>
                <Text style={s.avatarInitial}>{safeName.replace('د.', '').trim().charAt(0) || 'د'}</Text>
              </View>
            )}
          </View>

          <View style={s.profileInfo}>
            <Text style={s.doctorName} numberOfLines={1}>{safeName}</Text>
            <Text style={s.doctorSpecialty}>{safeSpecialty}</Text>
            <View style={s.expBadge}>
              <Text style={s.expText}>{safeExperience}</Text>
            </View>
          </View>
        </View>

        {/* 2. زرار المتابعة */}
        <TouchableOpacity style={[s.followBtn, following && s.followBtnActive]} onPress={handleFollow} activeOpacity={0.8}>
          <Text style={[s.followBtnText, following && s.followBtnTextActive]}>
            {following ? '✓  تتابعه الآن' : 'أتابع'}
          </Text>
        </TouchableOpacity>

        {/* 3. مكان العمل + الخريطة */}
        <SectionTitle title="مكان العمل" />
        <View style={s.card}>
          <InfoRow label="الاسم" value={safeClinicName} />
          <InfoRow label="عنوان" value={safeClinicAddress} isLast />
          
          {/* 👈 جوجل ماب الحقيقية */}
          <View style={s.mapContainer}>
            <MapView
              style={s.realMap}
              initialRegion={{
                latitude: 30.0444,  // خط العرض (ممكن تربطه بالداتا لو راجعة من الـ API)
                longitude: 31.2357, // خط الطول
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker 
                coordinate={{ latitude: 30.0444, longitude: 31.2357 }} 
                title={safeClinicName}
                description={safeClinicAddress}
              />
            </MapView>
          </View>
        </View>

        {/* 4. مواعيد العمل */}
        <SectionTitle title="مواعيد العمل" />
        <View style={s.card}>
          <InfoRow label="مواقيت العمل" value={safeWorkTime} />
          <InfoRow label="أيام العمل" value={safeWorkDays} isLast />
        </View>

        {/* 5. الأسعار */}
        <SectionTitle title="الأسعار" />
        <View style={s.card}>
          <View style={s.priceRow}>
            <Text style={s.priceLabel}>الكشف : </Text>
            <Text style={s.priceAmount}>{safeExamPrice}</Text>
          </View>
          <View style={[s.priceRow, { marginTop: 12 }]}>
            <Text style={s.priceLabel}>الاستشارة : </Text>
            <Text style={s.priceAmount}>{safeConsultPrice}</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── StyleSheet ───────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

  // كارت الدكتور
  profileCard: {
    flexDirection: 'row', // بيخلي الصورة يمين عشان الـ RTL شغال
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  avatarWrap: { padding: 3, borderRadius: 40, borderWidth: 1, borderColor: COLORS.brandFaint, marginLeft: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  avatarFallback: { backgroundColor: COLORS.brandFaint, alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontSize: 24, fontWeight: '700', color: COLORS.brand },
  
  profileInfo: { flex: 1, alignItems: 'flex-start' }, // فليكس ستارت في الـ RTL يعني يمين
  doctorName: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'right' },
  doctorSpecialty: { fontSize: 14, color: COLORS.textSecond, marginTop: 4, textAlign: 'right' },
  expBadge: { backgroundColor: COLORS.brandFaint, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginTop: 8, alignSelf: 'flex-start' },
  expText: { fontSize: 12, color: COLORS.brand, fontWeight: '700' },

  // زرار المتابعة
  followBtn: { width: '100%', borderWidth: 1.5, borderColor: COLORS.brand, borderRadius: 12, paddingVertical: 12, alignItems: 'center', backgroundColor: COLORS.surface, marginBottom: 20 },
  followBtnActive: { backgroundColor: COLORS.brand },
  followBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.brand },
  followBtnTextActive: { color: COLORS.surface },

  // الكروت العامة
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 20, elevation: 2 },
  
  // السطور (العناوين والبيانات)
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  infoLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textSecond },
  infoValue: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '600', flex: 1 },

  // الخريطة
  mapContainer: { width: '100%', height: 160, borderRadius: 12, marginTop: 15, overflow: 'hidden' },
  realMap: { width: '100%', height: '100%' },

  // الأسعار
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  priceLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textSecond },
  priceAmount: { fontSize: 15, fontWeight: '700', color: COLORS.brand },
});

export default DoctorDetailsScreen;