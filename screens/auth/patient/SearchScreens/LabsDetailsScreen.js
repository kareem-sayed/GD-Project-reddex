import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'; 

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

// ─── مكون فرعي للسطور ───
const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[s.infoRow, !isLast && s.infoRowBorder]}>
    <Text style={s.infoLabel}>{label} : </Text>
    <Text style={s.infoValue}>{value}</Text>
  </View>
);

const LabDetailsScreen = ({ navigation, route }) => {
  const centerData = route?.params?.centerData ?? {};

  const safeName = centerData.name || 'معمل تحاليل';
  const safeImage = centerData.image || { uri: 'https://via.placeholder.com/150/8B1A1A/FFFFFF?text=Lab' };
  const safeWorkTime = centerData.workTime || '9:00 AM - 9:00 PM';
  const safePhone = centerData.phone || 'غير متاح حالياً';
  const safeLocation = centerData.location || 'العنوان غير محدد';
  
  const safeWorkDays = centerData.workDays || 'طوال الأسبوع';
  const safeWebsite = centerData.website || 'متاح عند الطلب';

  const [isSaved, setIsSaved] = useState(centerData.isSaved || false);

  const branches = [
    {
      id: 1,
      title: 'الفرع الرئيسي',
      address: safeLocation, 
      lat: 30.0444,
      lng: 31.2357,
    },
    {
      id: 2,
      title: 'الفرع الثاني',
      address: 'امتداد الفرع الرئيسي، بالقرب من وسط المدينة',
      lat: 30.0500,
      lng: 31.2400,
    }
  ];

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <StackHeader 
        title="تفاصيل المعمل" 
        onBackPress={() => navigation.goBack()} 
      />

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. كارت المعمل الرئيسي */}
        <View style={s.topCard}>
          <View style={s.topCardInfo}>
            <Image source={safeImage} style={s.logo} />
            <View style={s.nameRatingWrap}>
              <Text style={s.labName}>{safeName}</Text>
              {/* 👈 تم إزالة صف النجوم والتقييم بالكامل من هنا */}
            </View>
          </View>
          
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)} activeOpacity={0.7} style={s.bookmarkBtn}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={COLORS.brand} />
          </TouchableOpacity>
        </View>

        {/* 2. مواعيد العمل */}
        <SectionTitle title="مواعيد العمل" />
        <View style={s.card}>
          <InfoRow label="مواقيت العمل" value={safeWorkTime} />
          <InfoRow label="ايام العمل" value={safeWorkDays} isLast />
        </View>

        {/* 3. معلومات الاتصال */}
        <SectionTitle title="معلومات الاتصال" />
        <View style={s.card}>
          <InfoRow label="تلفون" value={safePhone} />
          <InfoRow label="الموقع" value={safeWebsite} isLast />
        </View>

        

        {/* 5. الفروع داخل المنطقة */}
        <SectionTitle title="الفروع داخل المنطقة" />
        {branches.map((branch) => (
          <View key={branch.id} style={s.branchCard}>
            <Text style={s.branchTitle}>{branch.title}</Text>
            <InfoRow label="عنوان" value={branch.address} isLast />
            
            <View style={s.mapContainer}>
              <MapView
                style={s.realMap}
                initialRegion={{
                  latitude: branch.lat,
                  longitude: branch.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker 
                  coordinate={{ latitude: branch.lat, longitude: branch.lng }} 
                  title={branch.title}
                />
              </MapView>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── StyleSheet ───────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },

  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 20, elevation: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  infoLabel: { fontSize: 13, fontWeight: '700', color: COLORS.textSecond },
  infoValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '600', flex: 1, textAlign: 'right' },

  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  topCardInfo: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 50, height: 50, borderRadius: 25, marginLeft: 12 },
  nameRatingWrap: { alignItems: 'flex-start', justifyContent: 'center' },
  labName: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  bookmarkBtn: { padding: 5 },

  filterSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  dropdownWrapper: { flex: 1 },
  dropdownLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textSecond, marginBottom: 6, textAlign: 'center' },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 45,
  },
  dropdownText: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '600' },
  searchBtnWrapper: { height: 45, justifyContent: 'flex-end' },
  searchBtn: {
    backgroundColor: COLORS.brand,
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  branchCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  branchTitle: { fontSize: 14, fontWeight: '800', color: COLORS.textSecond, marginBottom: 8 },

  mapContainer: { width: '100%', height: 140, borderRadius: 12, marginTop: 10, overflow: 'hidden' },
  realMap: { width: '100%', height: '100%' },
});

export default LabDetailsScreen;