import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
type TabKey = 'home' | 'explore' | 'compare' | 'favorites' | 'profile';

export function AppNavigator() {
  const { hydrated, user, favorites, compareIds, toggleFavorite, toggleCompare, clearCompare } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [bookingCarId, setBookingCarId] = useState<string | null>(null);
  const [showFindQuiz, setShowFindQuiz] = useState(false);
  const selectedCar = useMemo(() => cars.find(car => car.id === selectedCarId), [selectedCarId]);
  if (!hydrated) return <View style={styles.loading}><Text style={styles.logo}>CarApp</Text></View>;
  if (!user) return <AuthScreen mode={authMode} onChangeMode={() => setAuthMode(mode => mode === 'login' ? 'signup' : 'login')} />;
  const openDetails = (car: Car) => { setSelectedCarId(car.id); setBookingCarId(null); setShowFindQuiz(false); };
  const renderContent = () => {
    if (showFindQuiz) return <FindMyCarScreen cars={cars} onBack={() => setShowFindQuiz(false)} onSelectCar={openDetails} />;
    if (bookingCarId) return <TestDriveScreen car={cars.find(car => car.id === bookingCarId) ?? cars[0]} onBack={() => setBookingCarId(null)} />;
    if (selectedCar) return <CarDetailsScreen car={selectedCar} isFavorite={favorites.includes(selectedCar.id)} onToggleFavorite={() => toggleFavorite(selectedCar.id)} onBookTestDrive={() => setBookingCarId(selectedCar.id)} onBack={() => setSelectedCarId(null)} />;
    const common = { cars, favorites, onToggleFavorite: toggleFavorite, onSelectCar: openDetails };
    if (activeTab === 'home') return <HomeScreen {...common} onOpenFindMyCar={() => setShowFindQuiz(true)} onOpenDetails={openDetails} onOpenProfile={() => setActiveTab('profile')} />;
    if (activeTab === 'explore') return <ExploreScreen {...common} compareIds={compareIds} onToggleCompare={toggleCompare} />;
    if (activeTab === 'compare') return <CompareScreen cars={cars.filter(car => compareIds.includes(car.id))} onSelectCar={openDetails} onRemoveCar={toggleCompare} onClear={clearCompare} onExplore={() => setActiveTab('explore')} />;
    if (activeTab === 'favorites') return <FavoritesScreen cars={cars.filter(car => favorites.includes(car.id))} onSelectCar={openDetails} onRemoveFavorite={toggleFavorite} onBrowse={() => setActiveTab('explore')} />;
    return <ProfileScreen user={user} onOpenFavorites={() => setActiveTab('favorites')} onOpenFindMyCar={() => setShowFindQuiz(true)} />;
  };
  const tabs: [TabKey, string, string][] = [['home', 'Home', '⌂'], ['explore', 'Explore', '⌕'], ['compare', `Compare (${compareIds.length})`, '≡'], ['favorites', 'Favorites', '♡'], ['profile', 'Profile', '○']];
  return <View style={styles.container}><View style={styles.content}>{renderContent()}</View>{!showFindQuiz && !bookingCarId && !selectedCar && <View style={styles.tabBar}>{tabs.map(([key, label, icon]) => <Pressable key={key} onPress={() => setActiveTab(key)} style={[styles.tabItem, activeTab === key && styles.activeTabItem]}><Text style={styles.tabIcon}>{icon}</Text><Text style={[styles.tabText, activeTab === key && styles.activeTabText]}>{label}</Text></Pressable>)}</View>}</View>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: COLORS.background }, content: { flex: 1 }, loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background }, logo: { color: COLORS.gold, fontSize: 30, fontWeight: '900' }, tabBar: { flexDirection: 'row', backgroundColor: '#111111', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 10, paddingBottom: 18, paddingHorizontal: 8 }, tabItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 14 }, activeTabItem: { backgroundColor: 'rgba(212, 175, 55, 0.12)' }, tabIcon: { color: COLORS.text, fontSize: 20 }, tabText: { color: COLORS.muted, fontSize: 11, fontWeight: '600', marginTop: 4 }, activeTabText: { color: COLORS.gold } });
