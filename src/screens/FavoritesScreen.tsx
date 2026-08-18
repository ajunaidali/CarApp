import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CarCard } from '../components/CarCard';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onRemoveFavorite: (id: string) => void;
  onBrowse: () => void;
};

export function FavoritesScreen({ cars, onSelectCar, onRemoveFavorite, onBrowse }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {cars.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No saved cars yet</Text>
          <Pressable style={styles.primaryButton} onPress={onBrowse}>
            <Text style={styles.primaryText}>Explore Cars</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite
              onToggleFavorite={() => onRemoveFavorite(car.id)}
              onPress={() => onSelectCar(car)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  primaryText: {
    color: COLORS.background,
    fontWeight: '800',
  },
  list: {
    paddingBottom: 28,
  },
});
