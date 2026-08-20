import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandCard } from '../components/BrandCard';
import { CarCard } from '../components/CarCard';
import { CategoryCard } from '../components/CategoryCard';
import { SearchBar } from '../components/SearchBar';
import { Car, brands, categories } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCar: (car: Car) => void;
  onOpenDetails: (car: Car) => void;
  onOpenFindMyCar: () => void;
  onOpenProfile?: () => void;
};

const brandImages: Record<string, string> = {
  BMW: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
  'Mercedes-Benz': 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=400&q=80',
  Audi: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
  Toyota: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80',
  Honda: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=400&q=80',
};

export function HomeScreen({ cars, favorites, onToggleFavorite, onSelectCar, onOpenDetails, onOpenFindMyCar, onOpenProfile }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('SUV');

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = !search || `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'SUV' ? car.category === 'SUV' || car.bodyType === 'SUV' : car.category === selectedCategory || car.bodyType === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [cars, search, selectedCategory]);

  const featured = cars.slice(0, 2);
  const latest = cars.slice(2, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>CarApp</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton} onPress={() => Alert.alert('Notifications', 'You are all caught up.') }><Text style={styles.iconText}>🔔</Text></Pressable>
          <Pressable style={styles.iconButton} onPress={onOpenProfile}><Text style={styles.iconText}>👤</Text></Pressable>
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <Pressable style={styles.quizCard} onPress={onOpenFindMyCar}>
        <View>
          <Text style={styles.quizLabel}>Find My Car</Text>
          <Text style={styles.quizText}>Take a quick quiz and discover your perfect match.</Text>
        </View>
        <Text style={styles.quizIcon}>→</Text>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {categories.map(category => (
          <CategoryCard
            key={category}
            title={category}
            isSelected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Cars</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carRow}>
        {featured.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={() => onToggleFavorite(car.id)}
            onPress={() => onSelectCar(car)}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Brands</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandRow}>
        {brands.map(brand => (
          <BrandCard key={brand} name={brand} image={brandImages[brand]} onPress={() => setSearch(brand)} />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest Arrivals</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carRow}>
        {latest.map(car => (
          <Pressable key={car.id} style={styles.latestCard} onPress={() => onOpenDetails(car)}>
            <Image source={{ uri: car.images[0] }} style={styles.latestImage} resizeMode="cover" />
            <View style={styles.latestInfo}>
              <Text style={styles.latestBrand}>{car.brand}</Text>
              <Text style={styles.latestModel}>{car.model}</Text>
              <Text style={styles.latestPrice}>${car.price.toLocaleString()}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Matches</Text>
      </View>
      {filteredCars.length > 0 ? (
        filteredCars.slice(0, 2).map(car => (
          <Pressable key={car.id} style={styles.matchCard} onPress={() => onSelectCar(car)}>
            <Image source={{ uri: car.images[0] }} style={styles.matchImage} />
            <View style={styles.matchInfo}>
              <Text style={styles.matchName}>{car.brand} {car.model}</Text>
              <Text style={styles.matchMeta}>{car.year} • {car.bodyType}</Text>
              <Text style={styles.matchPrice}>${car.price.toLocaleString()}</Text>
            </View>
          </Pressable>
        ))
      ) : (
        <Text style={styles.emptyText}>No cars match this search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  logo: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconText: {
    fontSize: 18,
  },
  quizCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(#121212,#1b1b1b)',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quizLabel: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  quizText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    maxWidth: 220,
  },
  quizIcon: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  seeAll: {
    color: COLORS.gold,
    fontWeight: '700',
  },
  categoryRow: {
    gap: 12,
    paddingRight: 12,
  },
  carRow: {
    paddingRight: 12,
  },
  brandRow: {
    paddingRight: 12,
  },
  latestCard: {
    width: 170,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 14,
  },
  latestImage: {
    width: '100%',
    height: 120,
  },
  latestInfo: {
    padding: 12,
  },
  latestBrand: {
    color: COLORS.goldSoft,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  latestModel: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  latestPrice: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  matchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 14,
    flexDirection: 'row',
  },
  matchImage: {
    width: 120,
    height: 90,
  },
  matchInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  matchName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
  },
  matchMeta: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  matchPrice: {
    color: COLORS.gold,
    fontWeight: '700',
    marginTop: 8,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: 'center',
    paddingVertical: 18,
  },
});
