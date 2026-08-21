import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { Car, cars } from '../data/cars';
import { useApp } from '../context/AppContext';
import { AuthScreen } from '../screens/AuthScreen';
import { CarDetailsScreen } from '../screens/CarDetailsScreen';
import { CompareScreen } from '../screens/CompareScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { FindMyCarScreen } from '../screens/FindMyCarScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TestDriveScreen } from '../screens/TestDriveScreen';
import { COLORS } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type TabKey = 'home' | 'explore' | 'compare' | 'favorites' | 'profile';

function LoadingScreen() {
  const theme = useTheme();
  const { width } = Dimensions.get('window');
  const animationSize = Math.min(320, Math.max(180, width * 0.6));

  return (
    <View style={[styles.loadingScreen, { backgroundColor: theme.background }]}>
      <LoadingAnimation size={animationSize} autoPlay loop />
      <Text style={[styles.loadingLogo, { color: theme.gold }]}>CarApp</Text>
      <Text style={[styles.loadingText, { color: theme.text }]}>Finding your next car...</Text>
    </View>
  );
}

export function AppNavigator() {
  const { hydrated, user, favorites, compareIds, toggleFavorite, toggleCompare, clearCompare, isDark } = useApp();
  const theme = useTheme();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [bookingCarId, setBookingCarId] = useState<string | null>(null);
  const [showFindQuiz, setShowFindQuiz] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const previousUserRef = useRef<typeof user>(undefined);
  const selectedCar = useMemo(() => cars.find(car => car.id === selectedCarId), [selectedCarId]);

  useEffect(() => {
    if (!hydrated) return;
    const shouldShowSplash = previousUserRef.current === undefined || (user !== null && previousUserRef.current === null);
    if (shouldShowSplash) setShowSplash(true);
    previousUserRef.current = user;
  }, [hydrated, user]);

  useEffect(() => {
    if (!hydrated || !showSplash) return;
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, [hydrated, showSplash, user]);

  if (!hydrated || showSplash) return <LoadingScreen />;
  if (!user) return <AuthScreen mode={authMode} onChangeMode={() => setAuthMode(mode => mode === 'login' ? 'signup' : 'login')} />;

  const openDetails = (car: Car) => { setSelectedCarId(car.id); setBookingCarId(null); setShowFindQuiz(false); };
  const renderContent = () => {
    if (showFindQuiz) return <FindMyCarScreen cars={cars} favorites={favorites} onToggleFavorite={toggleFavorite} onBack={() => setShowFindQuiz(false)} onSelectCar={openDetails} />;
    if (bookingCarId) return <TestDriveScreen car={cars.find(car => car.id === bookingCarId) ?? cars[0]} onBack={() => setBookingCarId(null)} />;
    if (selectedCar) return <CarDetailsScreen car={selectedCar} isFavorite={favorites.includes(selectedCar.id)} onToggleFavorite={() => toggleFavorite(selectedCar.id)} onBookTestDrive={() => setBookingCarId(selectedCar.id)} onBack={() => setSelectedCarId(null)} />;
    const common = { cars, favorites, onToggleFavorite: toggleFavorite, onSelectCar: openDetails };
    if (activeTab === 'home') return <HomeScreen {...common} onOpenFindMyCar={() => setShowFindQuiz(true)} onOpenDetails={openDetails} onOpenProfile={() => setActiveTab('profile')} />;
    if (activeTab === 'explore') return <ExploreScreen {...common} compareIds={compareIds} onToggleCompare={toggleCompare} />;
    if (activeTab === 'compare') return <CompareScreen cars={cars.filter(car => compareIds.includes(car.id))} onSelectCar={openDetails} onRemoveCar={toggleCompare} onClear={clearCompare} onExplore={() => setActiveTab('explore')} />;
    if (activeTab === 'favorites') return <FavoritesScreen cars={cars.filter(car => favorites.includes(car.id))} onSelectCar={openDetails} onRemoveFavorite={toggleFavorite} onBrowse={() => setActiveTab('explore')} />;
    return <ProfileScreen user={user} onOpenFavorites={() => setActiveTab('favorites')} onOpenFindMyCar={() => setShowFindQuiz(true)} />;
  };

  const tabs: [TabKey, string, string][] = [['home', 'Home', '⌂'], ['explore', 'Explore', '⌕'], ['compare', 'Compare', '≡'], ['favorites', 'Favorites', '♡'], ['profile', 'Profile', '○']];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? COLORS.background : theme.background }]}>
      <View style={styles.content}>{renderContent()}</View>
      {!showFindQuiz && !bookingCarId && !selectedCar && (
        <View style={[styles.tabBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
          {tabs.map(([key, label, icon]) => (
            <Pressable key={key} onPress={() => setActiveTab(key)} style={[styles.tabItem, activeTab === key && styles.activeTabItem]}>
              <Text style={[styles.tabIcon, { color: activeTab === key ? theme.gold : theme.text }]}>{icon}</Text>
              <Text style={[styles.tabText, { color: activeTab === key ? theme.gold : theme.muted }]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  loadingScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  loadingLogo: { fontSize: 32, fontWeight: '900', marginTop: 16, letterSpacing: 0.5 },
  loadingText: { fontSize: 16, marginTop: 12, fontWeight: '600', textAlign: 'center' },
  tabBar: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, paddingBottom: 18, paddingHorizontal: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 14 },
  activeTabItem: { backgroundColor: 'rgba(212, 175, 55, 0.12)' },
  tabIcon: { fontSize: 20 },
  tabText: { fontSize: 11, fontWeight: '600', marginTop: 4 },
});
