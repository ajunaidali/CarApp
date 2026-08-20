import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onRemoveCar?: (id: string) => void;
  onClear?: () => void;
  onExplore?: () => void;
};

export function CompareScreen({ cars, onSelectCar, onRemoveCar, onClear, onExplore }: Props) {
  const specs = [
    { label: 'Price', key: 'price' },
    { label: 'Year', key: 'year' },
    { label: 'Mileage', key: 'mileage' },
    { label: 'Engine', key: 'engine' },
    { label: 'Fuel', key: 'fuel' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Horsepower', key: 'horsepower' },
    { label: 'Body type', key: 'bodyType' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}><Text style={styles.title}>Compare Cars</Text>{cars.length > 0 && <Pressable onPress={onClear}><Text style={styles.clear}>Clear all</Text></Pressable>}</View>
      {cars.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No Cars to Compare</Text><Text style={styles.emptyText}>Select cars from Explore to compare them.</Text><Pressable style={styles.exploreButton} onPress={onExplore}><Text style={styles.exploreText}>Explore Cars</Text></Pressable></View> : <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableWrap}>
          <View style={styles.headerRow}>
            <Text style={styles.emptyCell}>Spec</Text>
            {cars.map(car => (
              <View key={car.id} style={styles.carHeader}>
                <Text style={styles.brand}>{car.brand}</Text>
                <Text style={styles.model}>{car.model}</Text>
                <Pressable onPress={() => onSelectCar(car)}><Text style={styles.viewDetails}>View details</Text></Pressable>
                <Pressable onPress={() => onRemoveCar?.(car.id)}><Text style={styles.remove}>Remove</Text></Pressable>
              </View>
            ))}
          </View>
          {specs.map(spec => (
            <View key={spec.label} style={styles.row}>
              <Text style={styles.label}>{spec.label}</Text>
              {cars.map(car => (
                <Text key={`${car.id}-${spec.key}`} style={styles.value}>
                  {spec.key === 'price' ? `$${car.price.toLocaleString()}` : spec.key === 'horsepower' ? `${car.horsepower} hp` : spec.key === 'bodyType' ? car.bodyType : String((car as any)[spec.key])}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>}
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
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clear: { color: COLORS.gold, fontWeight: '800' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
  emptyText: { color: COLORS.muted, textAlign: 'center', marginTop: 8, marginBottom: 18 },
  exploreButton: { backgroundColor: COLORS.gold, borderRadius: 14, paddingHorizontal: 20, paddingVertical: 13 },
  exploreText: { color: COLORS.background, fontWeight: '800' },
  viewDetails: { color: COLORS.gold, fontSize: 11, marginTop: 12, fontWeight: '700' },
  remove: { color: COLORS.error, fontSize: 11, marginTop: 8, fontWeight: '700' },
  tableWrap: {
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  emptyCell: {
    width: 120,
    color: COLORS.text,
    fontWeight: '700',
    paddingVertical: 18,
  },
  carHeader: {
    width: 170,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 12,
    marginRight: 12,
  },
  brand: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  model: {
    color: COLORS.text,
    fontWeight: '700',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    width: 120,
    color: COLORS.muted,
    paddingVertical: 16,
    fontWeight: '700',
  },
  value: {
    width: 170,
    color: COLORS.text,
    marginRight: 12,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
