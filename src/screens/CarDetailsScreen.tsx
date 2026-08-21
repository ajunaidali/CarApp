import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Car } from '../data/cars';
import { COLORS } from '../theme/colors';

type Props = {
  car: Car;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onBookTestDrive?: () => void;
  onBack?: () => void;
};

export function CarDetailsScreen({ car, isFavorite, onToggleFavorite, onBookTestDrive, onBack }: Props) {
  const [selectedImage, setSelectedImage] = useState(car.images[0]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {onBack && <Pressable onPress={onBack} style={styles.backButton}><Text style={styles.backText}>‹ Back</Text></Pressable>}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} resizeMode="cover" />
      <View style={styles.thumbnailRow}>
        {car.images.map(image => (
          <Pressable key={image} onPress={() => setSelectedImage(image)} style={[styles.thumb, selectedImage === image && styles.selectedThumb]}>
            <Image source={{ uri: image }} style={styles.thumbImage} resizeMode="cover" />
          </Pressable>
        ))}
      </View>

      <Text style={styles.brand}>{car.brand}</Text>
      <View style={styles.titleRow}>
        <Text style={styles.model}>{car.model}</Text>
        <Text style={styles.price}>${car.price.toLocaleString()}</Text>
      </View>
      <Text style={styles.meta}>{car.year} • {car.mileage} • {car.fuel}</Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoBox}><Text style={styles.infoLabel}>Transmission</Text><Text style={styles.infoValue}>{car.transmission}</Text></View>
        <View style={styles.infoBox}><Text style={styles.infoLabel}>Engine</Text><Text style={styles.infoValue}>{car.engine}</Text></View>
        <View style={styles.infoBox}><Text style={styles.infoLabel}>Mileage</Text><Text style={styles.infoValue}>{car.mileage}</Text></View>
        <View style={styles.infoBox}><Text style={styles.infoLabel}>Color</Text><Text style={styles.infoValue}>{car.color}</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          {car.features.map(feature => (
            <View key={feature} style={styles.featureChip}><Text style={styles.featureText}>{feature}</Text></View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{car.description}</Text>
      </View>

      <View style={styles.dealerCard}>
        <Text style={styles.sectionTitle}>Dealer</Text>
        <Text style={styles.dealerName}>{car.dealer.name}</Text>
        <Text style={styles.dealerLocation}>{car.dealer.location}</Text>
        <Pressable style={styles.contactButton} onPress={() => Alert.alert('Contact Dealer', `${car.dealer.name}\n${car.dealer.phone}`)}><Text style={styles.contactText}>Contact Dealer</Text></Pressable>
      </View>

      <View style={styles.bottomActions}>
        <Pressable style={styles.favoriteButton} onPress={onToggleFavorite}><Text style={styles.primaryText}>{isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}</Text></Pressable>
        <Pressable style={styles.bookingButton} onPress={onBookTestDrive}><Text style={styles.bookingText}>Book Test Drive</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 36,
    flexGrow: 1,
  },
  backButton: { paddingHorizontal: 18, paddingVertical: 14 },
  backText: { color: COLORS.gold, fontWeight: '800', fontSize: 16 },
  mainImage: {
    width: '100%',
    aspectRatio: 1.55,
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  thumb: {
    width: 68,
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedThumb: {
    borderColor: COLORS.gold,
    borderWidth: 2,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  brand: {
    marginTop: 18,
    marginHorizontal: 18,
    color: COLORS.gold,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  titleRow: {
    marginHorizontal: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  model: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    flexShrink: 1,
    marginRight: 12,
  },
  price: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
  },
  meta: {
    color: COLORS.muted,
    marginHorizontal: 18,
    marginTop: 8,
    fontSize: 14,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 22,
    gap: 12,
  },
  infoBox: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    color: COLORS.muted,
    fontSize: 12,
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: '700',
    marginTop: 6,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureChip: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: COLORS.muted,
    lineHeight: 22,
    fontSize: 15,
  },
  dealerCard: {
    marginTop: 24,
    marginHorizontal: 18,
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dealerName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
  },
  dealerLocation: {
    color: COLORS.muted,
    marginTop: 4,
  },
  contactButton: {
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    alignItems: 'center',
  },
  contactText: {
    color: COLORS.background,
    fontWeight: '800',
  },
  bottomActions: {
    marginTop: 24,
    paddingHorizontal: 18,
    gap: 10,
    marginBottom: 32,
  },
  favoriteButton: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookingButton: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryText: {
    color: COLORS.text,
    fontWeight: '800',
  },
  bookingText: {
    color: COLORS.background,
    fontWeight: '800',
  },
});
