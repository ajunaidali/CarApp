import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  name: string;
  image: string;
  onPress?: () => void;
};

export function BrandCard({ name, image, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.logoWrap}>
        <Image source={{ uri: image }} style={styles.logo} resizeMode="cover" />
      </View>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    marginRight: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  logoWrap: {
    height: 70,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
