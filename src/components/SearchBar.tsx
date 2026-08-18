import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Search cars, brands or models' }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    color: COLORS.text,
    fontSize: 15,
    padding: 0,
  },
});
