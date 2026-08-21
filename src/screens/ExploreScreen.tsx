import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CarCard } from '../components/CarCard';
import { FilterModal } from '../components/FilterModal';
import { SearchBar } from '../components/SearchBar';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCar: (car: Car) => void;
  compareIds?: string[];
  onToggleCompare?: (id: string) => void;
};

export function ExploreScreen({ cars, favorites, onToggleFavorite, onSelectCar, compareIds = [], onToggleCompare }: Props) {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(false);

  const filteredCars = useMemo(() => {
    const result = cars.filter(car => {
      const haystack = `${car.brand} ${car.model} ${car.year} ${car.category} ${car.bodyType}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesFilters = filters.length === 0 || filters.some(filter => [car.brand, car.fuel, car.transmission, car.bodyType, car.category, String(car.year)].includes(filter));
      return matchesSearch && matchesFilters;
    });
    return result.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);
  }, [cars, search, filters, sortAsc]);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>Explore Cars</Text>
        <View style={styles.actionRow}>
          <Pressable style={styles.smallButton} onPress={() => setShowFilters(true)}><Text style={styles.smallText}>Filter</Text></Pressable>
          <Pressable style={styles.smallButton} onPress={() => setSortAsc(current => !current)}><Text style={styles.smallText}>{sortAsc ? 'Price ↑' : 'Price ↓'}</Text></Pressable>
        </View>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />
      <ScrollView contentContainerStyle={styles.list}>
        {filteredCars.length > 0 ? filteredCars.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            onToggleFavorite={() => onToggleFavorite(car.id)}
            onPress={() => onSelectCar(car)}
            isCompared={compareIds.includes(car.id)}
            onToggleCompare={onToggleCompare ? () => onToggleCompare(car.id) : undefined}
          />
        )) : (
          <Text style={styles.emptyText}>No cars match your search.</Text>
        )}
      </ScrollView>
      <FilterModal visible={showFilters} selectedFilters={filters} onClose={() => setShowFilters(false)} onApply={next => { setFilters(next); setShowFilters(false); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
  },
  smallButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  smallText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 12,
  },
  list: {
    paddingTop: 18,
    paddingBottom: 40,
    gap: 16,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: 'center',
    paddingVertical: 28,
  },
});
