import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PAGE_WIDTH = SCREEN_WIDTH - 40; 

// Calculations for the fluid sliding pill inside the Nav Bar
const NAV_MARGIN_HORIZONTAL = 80; 
const NAV_PADDING_HORIZONTAL = 40; 
const INNER_WIDTH = SCREEN_WIDTH - NAV_MARGIN_HORIZONTAL - NAV_PADDING_HORIZONTAL;
const TAB_WIDTH = INNER_WIDTH / 4;
const PILL_WIDTH = 70; 

const TABS = ['home', 'plan', 'joined', 'profile'];

// ==========================================
// 1. HOME TAB (Your dashboard)
// ==========================================
const HomeTab = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const searchFocusAnim = useRef(new Animated.Value(0)).current;

  const handleSearchFocus = () => {
    Animated.spring(searchFocusAnim, {
      toValue: 1,
      friction: 6, 
      useNativeDriver: true,
    }).start();
  };

  const handleSearchBlur = () => {
    Animated.spring(searchFocusAnim, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const searchScale = searchFocusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.04], 
  });

  const renderDot = (index) => {
    const dotWidth = scrollX.interpolate({
      inputRange: [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
      outputRange: [10, 28, 10],
      extrapolate: 'clamp',
    });
    const dotColor = scrollX.interpolate({
      inputRange: [(index - 1) * PAGE_WIDTH, index * PAGE_WIDTH, (index + 1) * PAGE_WIDTH],
      outputRange: ['rgba(26, 26, 26, 0.3)', '#1A1A1A', 'rgba(26, 26, 26, 0.3)'],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View key={index} style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]} />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <Text style={styles.greetingText}>Good Morning Toni</Text>
        
        <Animated.View style={[styles.searchContainer, { transform: [{ scale: searchScale }] }]}>
          <Image source={require('../../assets/icons/location.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="What are you up for today?" 
            placeholderTextColor="#666" 
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <View style={styles.searchIconBg}>
            <Image source={require('../../assets/icons/search.png')} style={{ width: 14, height: 14, tintColor: '#FFF', resizeMode: 'contain' }} />
          </View>
        </Animated.View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity activeOpacity={0.8} style={styles.filterPill}>
            <Image source={require('../../assets/icons/movie.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
            <Text style={styles.filterText}>Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.filterPill}>
            <Image source={require('../../assets/icons/tea.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
            <Text style={styles.filterText}>Tea</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.filterPill}>
            <Image source={require('../../assets/icons/bicycle.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
            <Text style={styles.filterText}>Ride</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <LinearGradient colors={['#E6E2EC', '#D4E0CD', '#E6E2EC']} style={styles.bottomSection} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        {/* Swapped fixed height for flex: 1 so it fills the gradient area naturally */}
        <View style={{ flex: 1, paddingTop: 24 }}> 
          <Animated.ScrollView
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            contentContainerStyle={{ gap: 0 }}
          >
            {/* PAGE 1 */}
            <View style={[styles.bentoContainer, { width: PAGE_WIDTH }]}>
              <View style={styles.leftCard}>
                <Text style={styles.verticalText}>G{'\n'}R{'\n'}O{'\n'}U{'\n'}P{'\n'}{'\n'}S{'\n'}T{'\n'}U{'\n'}D{'\n'}Y</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.joinBtnLight}>
                  <Text style={styles.joinBtnTextLight}>join</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightColumn}>
                <View style={[styles.topRightCard, { backgroundColor: '#D7E05C' }]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Chai Treat</Text>
                    <View style={styles.timePill}><Text style={styles.timeText}>06:00</Text></View>
                  </View>
                  <View style={styles.locationRow}>
                    <Image source={require('../../assets/icons/location.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
                    <View><Text style={styles.locationTitle}>vinod Tea stall</Text><Text style={styles.locationSub}>0.6 Km away</Text></View>
                  </View>
                  <View style={styles.moodRow}>
                    <Image source={require('../../assets/icons/happy.png')} style={[styles.iconMedium, { tintColor: '#1A1A1A' }]} />
                    <Text style={styles.moodText}>let's meet there</Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.joinBtnYellow}><Text style={styles.joinBtnTextDark}>join</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.bottomRightCard, { backgroundColor: '#86AB64' }]}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.joinBtnDark}><Text style={styles.joinBtnTextGreen}>join</Text></TouchableOpacity>
                </View>
              </View>
            </View>

            {/* PAGE 2 */}
            <View style={[styles.bentoContainer, { width: PAGE_WIDTH }]}>
              <View style={[styles.leftCard, { backgroundColor: '#FFB8D0' }]}>
                <Text style={styles.verticalText}>M{'\n'}O{'\n'}V{'\n'}I{'\n'}E{'\n'}{'\n'}N{'\n'}I{'\n'}G{'\n'}H{'\n'}T</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.joinBtnLight}>
                  <Text style={styles.joinBtnTextLight}>join</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightColumn}>
                <View style={[styles.topRightCard, { backgroundColor: '#FFD166' }]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Dinner</Text>
                    <View style={[styles.timePill, { backgroundColor: '#FFF3CD' }]}><Text style={styles.timeText}>20:30</Text></View>
                  </View>
                  <View style={styles.locationRow}>
                    <Image source={require('../../assets/icons/location.png')} style={[styles.iconSmall, { tintColor: '#1A1A1A' }]} />
                    <View><Text style={styles.locationTitle}>Taco Stand</Text><Text style={styles.locationSub}>1.2 Km away</Text></View>
                  </View>
                  <View style={styles.moodRow}>
                    <Image source={require('../../assets/icons/happy.png')} style={[styles.iconMedium, { tintColor: '#1A1A1A' }]} />
                    <Text style={styles.moodText}>I'm starving</Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.joinBtnYellow}><Text style={styles.joinBtnTextDark}>join</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.bottomRightCard, { backgroundColor: '#4DA1A9' }]} />
              </View>
            </View>
          </Animated.ScrollView>

          {/* Dots moved inside the flex area so they naturally anchor below the cards */}
          <View style={styles.pagination}>
            {renderDot(0)}
            {renderDot(1)}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

// ==========================================
// 2. PLAN/POST TAB
// ==========================================
const PlanTab = () => (
  <View style={styles.placeholderTab}>
    <Text style={styles.placeholderTitle}>Create a Plan</Text>
    <View style={styles.placeholderCard}>
      <Text style={styles.placeholderSubtitle}>What do you want to do?</Text>
    </View>
  </View>
);

// ==========================================
// 3. JOINED/CALENDAR TAB
// ==========================================
const JoinedTab = () => (
  <View style={styles.placeholderTab}>
    <Text style={styles.placeholderTitle}>Your Schedule</Text>
    <View style={[styles.placeholderCard, { backgroundColor: '#D7E05C' }]}>
      <Text style={[styles.placeholderSubtitle, { color: '#1A1A1A' }]}>Chai Treat at 06:00</Text>
    </View>
  </View>
);

// ==========================================
// 4. PROFILE TAB
// ==========================================
const ProfileTab = () => {
  const router = useRouter();
  return (
  <View style={styles.placeholderTab}>
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarCircleText}>T</Text>
    </View>
    <Text style={styles.placeholderTitle}>Toni</Text>
    <Text style={styles.placeholderSubtitle}>Ready for an adventure</Text>
    <TouchableOpacity activeOpacity={0.8} style={[styles.logoutcard, { backgroundColor: '#ff0000' }]} onPress={() => router.replace('/getstarted')}>
      <Text style={[styles.logout, { color: '#ffffff' }]}>Log Out</Text>
    </TouchableOpacity>
  </View>
  )
};

// ==========================================
// MAIN SCREEN WRAPPER
// ==========================================
const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const slideAnim = useRef(new Animated.Value(0)).current; 

  const handleTabPress = (tabName, index) => {
    setActiveTab(tabName);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      bounciness: 10, 
      speed: 14,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      (TAB_WIDTH * 0) + (TAB_WIDTH / 2) - (PILL_WIDTH / 2),
      (TAB_WIDTH * 1) + (TAB_WIDTH / 2) - (PILL_WIDTH / 2),
      (TAB_WIDTH * 2) + (TAB_WIDTH / 2) - (PILL_WIDTH / 2),
      (TAB_WIDTH * 3) + (TAB_WIDTH / 2) - (PILL_WIDTH / 2),
    ],
  });

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Dynamic Content Rendering 
        Added paddingBottom to ensure content isn't hidden behind the Nav Bar
      */}
      <View style={{ flex: 1, paddingBottom: 110 }}> 
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'plan' && <PlanTab />}
        {activeTab === 'joined' && <JoinedTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </View>

      {/* --- CUSTOM NAVIGATION BAR --- */}
      <BlurView intensity={70} tint="light" style={styles.bottomNav}>
        <Animated.View style={[styles.slidingPill, { transform: [{ translateX }] }]} />

        {TABS.map((tabName, index) => {
          let iconSource;
          switch (tabName) {
            case 'home': iconSource = require('../../assets/icons/home.png'); break;
            case 'plan': iconSource = require('../../assets/icons/plan.png'); break;
            case 'joined': iconSource = require('../../assets/icons/joined.png'); break;
            case 'profile': iconSource = require('../../assets/icons/profile.png'); break;
          }

          return (
            <TouchableOpacity
              key={tabName}
              activeOpacity={1}
              style={styles.navItemContainer}
              onPress={() => handleTabPress(tabName, index)}
            >
              <Image
                source={iconSource}
                style={[styles.navIcon, { tintColor: activeTab === tabName ? '#FFFFFF' : '#2E2E2E' }]}
              />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  topSection: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 },
  greetingText: { fontSize: 28, fontWeight: '700', color: '#E0D4AC', marginBottom: 24 },
  
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 30, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    marginBottom: 20 
  },
  
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1A1A1A' },
  searchIconBg: { backgroundColor: '#1A1A1A', borderRadius: 20, padding: 8 },
  filterScroll: { gap: 12 },
  filterPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, gap: 8 },
  filterText: { fontWeight: '600', fontSize: 15, color: '#1A1A1A' },
  
  bottomSection: { flex: 1, borderTopLeftRadius: 40, borderTopRightRadius: 40 }, // removed paddingTop here, moved to inner View
  
  bentoContainer: { flexDirection: 'row', gap: 12, paddingHorizontal: 20 },
  leftCard: { flex: 1.2, backgroundColor: '#C5ACFF', borderRadius: 40, padding: 20, justifyContent: 'space-between', alignItems: 'center', height: 280 },
  verticalText: { fontSize: 22, fontWeight: '800', textAlign: 'center', color: '#1A1A1A', lineHeight: 24, marginTop: 10 },
  rightColumn: { flex: 2, gap: 12, height: 280 },
  topRightCard: { borderRadius: 30, padding: 16, flex: 1.4, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  timePill: { backgroundColor: '#F5E42C', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  timeText: { fontWeight: '600', fontSize: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 10 },
  locationTitle: { fontWeight: '700', fontSize: 14, color: '#1A1A1A' },
  locationSub: { fontSize: 12, color: '#555', marginTop: 2 },
  moodRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  moodText: { fontSize: 14, fontWeight: '500', flex: 1, marginLeft: 8 },
  bottomRightCard: { borderRadius: 30, padding: 16, flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' },
  joinBtnLight: { backgroundColor: '#FFF', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  joinBtnYellow: { backgroundColor: '#F5E42C', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  joinBtnDark: { backgroundColor: '#232A20', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  joinBtnTextLight: { fontWeight: '500', color: '#1A1A1A' },
  joinBtnTextDark: { fontWeight: '500', color: '#1A1A1A' },
  joinBtnTextGreen: { fontWeight: '500' },
  
  pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 10 },
  dot: { height: 10, borderRadius: 5 },

  // FLUID NAV BAR STYLES
  bottomNav: { flexDirection: 'row', borderRadius: 99, paddingVertical: 10, paddingHorizontal: 20, position: 'absolute', bottom: 25, left: 40, right: 40, overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.65)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)' },
  slidingPill: { position: 'absolute', width: PILL_WIDTH, height: 48, borderRadius: 24, backgroundColor: '#1C1C1C', top: 10, left: 20 },
  navItemContainer: { width: TAB_WIDTH, height: 48, justifyContent: 'center', alignItems: 'center', zIndex: 1 },

  // ICON SIZES
  iconSmall: { width: 16, height: 16, resizeMode: 'contain' },
  iconMedium: { width: 22, height: 22, resizeMode: 'contain' },
  navIcon: { width: 24, height: 24, resizeMode: 'contain' },

  // PLACEHOLDER TAB STYLES
  placeholderTab: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  placeholderTitle: { fontSize: 28, fontWeight: '700', color: '#E0D4AC', marginBottom: 16 },
  placeholderSubtitle: { fontSize: 16, color: '#A0A0A0', textAlign: 'center' },
  placeholderCard: { width: '100%', padding: 24, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 24, marginTop: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#a078ff', marginBottom: 20 },
  logout: { fontSize: 16, fontWeight: '600', color: '#d50000', textAlign: 'center' },
  logoutcard: { width: '50%', padding: 16, borderRadius: 99, marginTop: 30 },
  avatarCircleText: { fontSize: 50, fontWeight: '800', color: '#e4c0ff', textAlign: 'center', lineHeight: 100 },
});