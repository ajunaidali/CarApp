import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Car, cars } from '../data/cars';
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
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [favorites, setFavorites] = useState<string[]>(['car-3']);
  const [selectedCarId, setSelectedCarId] = useState<string>('car-1');
  const [compareIds, setCompareIds] = useState<string[]>(['car-1', 'car-2']);
  const [bookingCarId, setBookingCarId] = useState<string | null>(null);
  const [showFindQuiz, setShowFindQuiz] = useState(false);

  const selectedCar = useMemo(() => cars.find(car => car.id === selectedCarId) ?? cars[0], [selectedCarId]);
  const favoriteCars = useMemo(() => cars.filter(car => favorites.includes(car.id)), [favorites]);
  const compareCars = useMemo(() => cars.filter(car => compareIds.includes(car.id)), [compareIds]);

  const toggleFavorite = (carId: string) => {
    setFavorites(current => current.includes(carId) ? current.filter(id => id !== carId) : [...current, carId]);
  };

  const onOpenDetails = (car: Car) => {
    setSelectedCarId(car.id);
    setBookingCarId(null);
    setShowFindQuiz(false);
  };

  const onOpenBooking = (car: Car) => {
    setBookingCarId(car.id);
    setSelectedCarId(car.id);
  };

  const renderTabContent = () => {
    if (showFindQuiz) {
      return <FindMyCarScreen cars={cars} onBack={() => setShowFindQuiz(false)} onSelectCar={onOpenDetails} />;
    }

    if (bookingCarId) {
      return <TestDriveScreen car={cars.find(car => car.id === bookingCarId) ?? selectedCar} onBack={() => setBookingCarId(null)} />;
    }

    if (selectedCar && activeTab === 'home' && !showFindQuiz) {
      return (
        <HomeScreen
          cars={cars}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectCar={onOpenDetails}
          onOpenFindMyCar={() => setShowFindQuiz(true)}
          onOpenDetails={onOpenDetails}
        />
      );
    }

    switch (activeTab) {
      case 'explore':
        return (
          <ExploreScreen
            cars={cars}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectCar={onOpenDetails}
          />
        );
      case 'compare':
        return (
          <CompareScreen
            cars={compareCars.length > 0 ? compareCars : [cars[0], cars[1]]}
            onSelectCar={onOpenDetails}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            cars={favoriteCars}
            onSelectCar={onOpenDetails}
            onRemoveFavorite={toggleFavorite}
            onBrowse={() => setActiveTab('explore')}
          />
        );
      case 'profile':
        return <ProfileScreen onOpenFindMyCar={() => setShowFindQuiz(true)} onOpenFavorites={() => setActiveTab('favorites')} />;
      default:
        return (
          <HomeScreen
            cars={cars}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectCar={onOpenDetails}
            onOpenFindMyCar={() => setShowFindQuiz(true)}
            onOpenDetails={onOpenDetails}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderTabContent()}</View>

      {!showFindQuiz && !bookingCarId && (
        <View style={styles.tabBar}>
          {[
            { key: 'home', label: 'Home', icon: '🏠' },
            { key: 'explore', label: 'Explore', icon: '🔍' },
            { key: 'compare', label: 'Compare', icon: '⚖️' },
            { key: 'favorites', label: 'Favorites', icon: '❤️' },
            { key: 'profile', label: 'Profile', icon: '👤' },
          ].map(tab => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key as TabKey)}
              style={[styles.tabItem, activeTab === tab.key && styles.activeTabItem]}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
  },
  activeTabItem: {
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  activeTabText: {
    color: COLORS.gold,
  },
});
