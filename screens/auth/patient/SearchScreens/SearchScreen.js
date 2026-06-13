import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  I18nManager,
  Text 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../../../components/SearchComponent/SearchBar';
import SectionTitle from '../../../components/SearchComponent/SectionTitle';
import DoctorCard from '../../../components/SearchComponent/DoctorCard';
import CenterCard from '../../../components/SearchComponent/CenterCard';

import { getDoctors, getPatientDoctors, followDoctor, getLabs } from '../../../../backEnd/api/services/patientApi';
import StackHeader from '../../../components/StackHeader';

I18nManager.forceRTL(true);

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  // States
  const [recommended, setRecommended] = useState([]); 
  const [followedDoctors, setFollowedDoctors] = useState([]); 
  const [centers, setCenters] = useState([]);

  // 1. جلب كل الدكاترة (للبحث)
  // 1. جلب كل الدكاترة (للبحث)
  const fetchDoctorsData = useCallback(async (query = "") => {
    try {
      const response = await getDoctors(query); 
      const doctorsArray = response?.data || []; 
      
      return doctorsArray.map((doc) => ({
        id: doc.id.toString(), // بنسيبه سترينج عشان المقارنة
        name: `د. ${doc?.user?.name || 'طبيب'}`,
        specialty: doc.specialty,
        image: doc?.user?.photourl ? { uri: doc.user.photourl } : { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
        experience: `+${doc.yearsExperience} سنين خبرة`,
        clinicName: doc.nameOfClinic,
        clinicAddress: doc.locationOfClinic,
        workTime: doc.workingHours,
        followUpStatus: doc.followUpStatus || 'NOT_FOLLOWED', 
      }));
    } catch (error) {
      console.log("❌ خطأ في جلب الدكاترة:", error);
      return [];
    }
  }, []);

  // 2. جلب الأطباء المتابع معاهم
  const fetchFollowedDoctorsData = useCallback(async () => {
    try {
      const response = await getPatientDoctors(); 
      const doctorsArray = response?.data || []; 

      return doctorsArray.map((doc) => ({
        id: doc.id.toString(), // خليناه سترينج هنا كمان عشان نقارن براحتنا
        name: `د. ${doc?.user?.name || 'طبيب'}`,
        specialty: doc.specialty,
        image: doc?.user?.photourl ? { uri: doc.user.photourl } : { uri: 'https://randomuser.me/api/portraits/men/32.jpg' },
        experience: `+${doc.yearsExperience} سنين خبرة`,
        clinicName: doc.nameOfClinic,
        clinicAddress: doc.locationOfClinic,
        workTime: doc.workingHours,
        followUpStatus: doc.followUpStatus || 'NOT_FOLLOWED', 
      }));
    } catch (error) {
      console.log("❌ خطأ في جلب أطباء المريض:", error);
      return [];
    }
  }, []);

  // 3. جلب بيانات المعامل (زي ما هي)
  const fetchLabsData = useCallback(async (query = "") => {
    try {
      const response = await getLabs(query); 
      const labsArray = response?.data || response || []; 
      
      const formattedLabs = labsArray.map((lab) => ({
        id: lab.id?.toString(),
        name: lab.name || 'معمل تحاليل', 
        image: lab.imageUrl ? { uri: lab.imageUrl } : { uri: 'https://via.placeholder.com/150/8B1A1A/FFFFFF?text=Lab' }, 
        location: lab.location,
        workTime: lab.workhours,
        phone: lab.phone,
        rating: lab.rating || 4.8, 
        isSaved: false, 
      }));

      setCenters(formattedLabs);
    } catch (error) {
      console.log("❌ خطأ في جلب المعامل:", error);
    }
  }, []);

  // 🌟 التعديل السحري: تجميع الداتا وفلترتها مع بعض
  const loadAllData = useCallback(async (query = "") => {
    // بنجيب الليستتين في نفس الوقت
    const [allDoctors, patientDoctors] = await Promise.all([
      fetchDoctorsData(query),
      fetchFollowedDoctorsData()
    ]);

    // نحفظ دكاترة المريض في الـ State
    setFollowedDoctors(patientDoctors);

    // 👈 الفلترة: بنعدي على كل الدكاترة، وناخد بس اللي "مش موجود" في لستة دكاترة المريض
    const filteredRecommended = allDoctors.filter(
      (doctor) => !patientDoctors.some((patientDoc) => patientDoc.id === doctor.id)
    );

    // نحفظ النتيجة المتفلترة في لستة المقترحات
    setRecommended(filteredRecommended);
  }, [fetchDoctorsData, fetchFollowedDoctorsData]);

  // تشغيل الجلب أول مرة
  useEffect(() => {
    loadAllData();
    fetchLabsData(); 
  }, [loadAllData, fetchLabsData]);

  // تشغيل البحث مع الـ Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // لما يبحث برضه بيفلتر بناءً على الدكاترة اللي متابع معاهم
      loadAllData(searchText);
    }, 500);

    return () => clearTimeout(delayDebounceFn); 
  }, [searchText, loadAllData]);
  
  // ==========================================
  // Navigation Handlers 
  // ==========================================
  const handleDoctorPress = useCallback((doctor) => {
    navigation.navigate('DoctorDetailsScreen', { doctorData: doctor });
  }, [navigation]);

  const handleCenterPress = useCallback((center) => {
    navigation.navigate('LabsDetailsScreen', { centerData: center });
  }, [navigation]);

  // 👈 التعديل التالت: ظبطنا دالة المتابعة عشان تعتمد على الحالات الجديدة
  const handleFollowPress = useCallback(async (id) => {
    // 👈 تحويل الـ id لرقم صحيح إجبارياً قبل ما نبعته للـ API
    const numericDoctorId = Number(id); 

    console.log("🛠️ محاولة إرسال طلب متابعة للدكتور رقم:", numericDoctorId);

    setRecommended((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, followUpStatus: 'PENDING' } : doc))
    );

    try {
      // 👈 باصينا الرقم الصافي للـ API هنا
      const response = await followDoctor(numericDoctorId); 
      
      console.log("✅ نجاح الريكويست:", response?.data || "تم بنجاح");
      alert("✅ تم إرسال طلب المتابعة بنجاح!"); 

    } catch (error) {
      const errorMsg = error?.response?.data || error?.message || "إيرور غير معروف";
      console.log("❌ الإيرور بالتفصيل:", errorMsg);
      alert(`❌ فشل الطلب: ${JSON.stringify(errorMsg)}`);

      setRecommended((prev) =>
        prev.map((doc) => (doc.id === id ? { ...doc, followUpStatus: 'NOT_FOLLOWED' } : doc))
      );
    }
  }, []);

  const handleSavePress = useCallback((id, newState) => {
    setCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSaved: newState } : c))
    );
  }, []);

  // Sections
  const sections = [
    { type: 'HEADER' },
    { type: 'SEARCH' },
    { type: 'SECTION_RECOMMENDED' },
    { type: 'RECOMMENDED_GRID' },
    { type: 'SECTION_AVAILABLE' },
    { type: 'AVAILABLE_LIST' },
    { type: 'SECTION_CENTERS' },
    { type: 'CENTERS_GRID' },
  ];

  const renderHorizontalDoctor = useCallback(({ item }) => (
    <DoctorCard 
      doctor={item} 
      variant="horizontal" 
      onPress={() => handleDoctorPress(item)} 
    />
  ), [handleDoctorPress]);

  const renderRecommendedDoctor = useCallback(({ item }) => (
    <DoctorCard
      doctor={item}
      variant="grid"
      onFollowPress={handleFollowPress}
      onPress={() => handleDoctorPress(item)} 
    />
  ), [handleFollowPress, handleDoctorPress]);

  // 👈 ربطنا الكارت بالدالة الجديدة هنا
  const renderCenter = useCallback(({ item }) => (
    <CenterCard 
      center={item} 
      onSavePress={handleSavePress} 
      onPress={() => handleCenterPress(item)} 
    />
  ), [handleSavePress, handleCenterPress]);

  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'HEADER':
        return <StackHeader onBackPress={() => navigation.navigate('Home')} title="ابحث عن طبيب" />;
      case 'SEARCH':
        return (
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ابحث عن اسم دكتور أو مجال طبي"
          />
        );
      case 'SECTION_RECOMMENDED':
        return <SectionTitle title="أطباء ممكن تتابع معاهم" />;
      case 'RECOMMENDED_GRID':
        return (
          <FlatList
            data={recommended}
            renderItem={renderRecommendedDoctor}
            keyExtractor={(doc) => `rec-${doc.id}`}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContent}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            ListEmptyComponent={<Text style={styles.emptyText}>لا يوجد أطباء متاحين حالياً</Text>}
          />
        );
      case 'SECTION_AVAILABLE':
        return <SectionTitle title="أطباء متابع معاهم" />;
      case 'AVAILABLE_LIST':
        return (
          <FlatList
            data={followedDoctors} 
            renderItem={renderHorizontalDoctor}
            keyExtractor={(doc) => `avail-${doc.id}`}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hListContent}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
            ListEmptyComponent={<Text style={styles.emptyText}>لم تقم بمتابعة أي طبيب حتى الآن.</Text>}
          />
        );
      case 'SECTION_CENTERS':
        return <SectionTitle title="مراكز قريبة منك" />;
      case 'CENTERS_GRID':
        return (
          <FlatList
            data={centers}
            renderItem={renderCenter}
            keyExtractor={(c) => `center-${c.id}`}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContent}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            ListEmptyComponent={<Text style={styles.emptyText}>لا توجد معامل متاحة حالياً</Text>}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.type}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  list: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  listContent: {
    paddingBottom: 16,
  },
  hListContent: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  gridContent: {
    paddingHorizontal: 10,
  },
});

export default SearchScreen;