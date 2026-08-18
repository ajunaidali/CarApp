import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  car: Car;
  isFavorite?: boolean;
  onPress?: () => void;
  onToggleFavorite?: () => void;
};

export function CarCard({ car, isFavorite, onPress, onToggleFavorite }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: car.images[0] }} style={styles.image} resizeMode="cover" />
      <Pressable style={styles.favoriteButton} onPress={onToggleFavorite}>
        <Text style={styles.favoriteText}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.brand}>{car.brand}</Text>
          <Text style={styles.price}>${car.price.toLocaleString()}</Text>
        </View>
        <Text style={styles.model}>{car.model}</Text>
        <Text style={styles.meta}>{car.year} • {car.fuel} • {car.transmission}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 290,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 16,
  },
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
});
