import React from 'react';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  car: Car;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
  isCompared?: boolean;
  onToggleCompare?: () => void;
  matchPercentage?: number;
  showDetailsLabel?: boolean;
};

export function CarCard({ car, isFavorite, onPress, onToggleFavorite, isCompared, onToggleCompare, matchPercentage, showDetailsLabel }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(290, Math.max(250, width - 36));

  return (
    <Pressable style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && styles.interactive]} onPress={onPress}>
      <Image source={{ uri: car.images[0] }} style={styles.image} resizeMode="cover" />
      <Pressable style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]} onPress={onToggleFavorite}>
        <Text style={styles.favoriteText}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.brand}>{car.brand}</Text>
          <Text style={styles.price}>${car.price.toLocaleString()}</Text>
        </View>
        <Text style={styles.model}>{car.model}</Text>
        <Text style={styles.meta}>{car.year} • {car.fuel} • {car.transmission}</Text>
        {matchPercentage !== undefined && <Text style={styles.match}>{matchPercentage}% Match</Text>}
        {showDetailsLabel && <Text style={styles.details}>View Details →</Text>}
        {onToggleCompare && <Pressable style={[styles.compareButton, isCompared && styles.compareSelected]} onPress={onToggleCompare}><Text style={styles.compareText}>{isCompared ? '✓ Comparing' : '+ Compare'}</Text></Pressable>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 16,
  },
  interactive: { transform: [{ scale: 0.985 }], elevation: 5 },
  image: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(11, 11, 11, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  favoriteText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: { opacity: 0.8 },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: COLORS.goldSoft,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  model: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '700',
    marginTop: 6,
  },
  meta: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 6,
  },
  match: { color: COLORS.gold, fontSize: 13, fontWeight: '800', marginTop: 8 },
  details: { color: COLORS.text, fontSize: 13, fontWeight: '700', marginTop: 10 },
  compareButton: { marginTop: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 8, alignItems: 'center' },
  compareSelected: { backgroundColor: 'rgba(212, 175, 55, 0.16)', borderColor: COLORS.gold },
  compareText: { color: COLORS.gold, fontSize: 12, fontWeight: '800' },
});
