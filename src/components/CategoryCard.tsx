import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  title: string;
  isSelected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function CategoryCard({ title, isSelected, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.selected,
        style,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 14,
  },
  textSelected: {
    color: COLORS.background,
  },
});
