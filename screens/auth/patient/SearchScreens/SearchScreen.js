import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
 
  StatusBar,
  I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchBar from '../../../components/SearchComponent/SearchBar';
import SectionTitle from '../../../components/SearchComponent/SectionTitle';
import DoctorCard from '../../../components/SearchComponent/DoctorCard';
import CenterCard from '../../../components/SearchComponent/CenterCard';

import StackHeader from '../../../components/StackHeader';
import {
  doctorsAvailable,
  recommendedDoctors,
  nearbyCenters,
} from '../../../../mock/SearchData';

 
I18nManager.forceRTL(true);
 
const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [recommended, setRecommended] = useState(recommendedDoctors);
  const [centers, setCenters] = useState(nearbyCenters);
 
  const handleFollowPress = useCallback((id, newState) => {
    setRecommended((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isFollowed: newState } : doc))
    );
  }, []);
 
  const handleSavePress = useCallback((id, newState) => {
    setCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSaved: newState } : c))
    );
  }, []);
 
  // FlatList sections data
  const sections = [
    { type: 'HEADER' },
    { type: 'SEARCH' },
    { type: 'SECTION_AVAILABLE' },
    { type: 'AVAILABLE_LIST' },
    { type: 'SECTION_RECOMMENDED' },
    { type: 'RECOMMENDED_GRID' },
    { type: 'SECTION_CENTERS' },
    { type: 'CENTERS_GRID' },
  ];
 
  const renderHorizontalDoctor = useCallback(({ item }) => (
    <DoctorCard doctor={item} variant="horizontal" />
  ), []);
 
  const renderRecommendedDoctor = useCallback(({ item }) => (
    <DoctorCard
      doctor={item}
      variant="grid"
      onFollowPress={handleFollowPress}
    />
  ), [handleFollowPress]);
 
  const renderCenter = useCallback(({ item }) => (
    <CenterCard center={item} onSavePress={handleSavePress} />
  ), [handleSavePress]);
 
  const renderSection = ({ item }) => {
    switch (item.type) {
      case 'HEADER':
        return ( 
          
            <StackHeader navigation={navigation} title="ابحث عن طبيب" />
          
        );
      case 'SEARCH':
        return (
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="ابحث عن اسم دكتور أو مجال طبي"
          />
        );
      case 'SECTION_AVAILABLE':
        return <SectionTitle title="أطباء متاحين معظم الوقت" />;
      case 'AVAILABLE_LIST':
        return (
          <FlatList
            data={doctorsAvailable}
            renderItem={renderHorizontalDoctor}
            keyExtractor={(doc) => `avail-${doc.id}`}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hListContent}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
          />
        );
      case 'SECTION_RECOMMENDED':
        return <SectionTitle title="أطباء يوصي بهم" />;
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
          />
        );
      default:
        return null;
    }
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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