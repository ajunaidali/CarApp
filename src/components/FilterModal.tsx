import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
};

export function FilterModal({ visible, onClose, onApply }: Props) {
  const filters = ['SUV', 'Sedan', 'Coupe', 'Hatchback', 'Electric', 'Automatic', 'Manual', 'Petrol', 'Hybrid'];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Refine your search</Text>
          <ScrollView contentContainerStyle={styles.content}>
            {filters.map(filter => (
              <Pressable key={filter} style={styles.chip}>
                <Text style={styles.chipText}>{filter}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={onApply}>
              <Text style={styles.primaryText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    minHeight: 420,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: COLORS.background,
    fontWeight: '800',
  },
});
