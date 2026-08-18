import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  onOpenFavorites: () => void;
  onOpenFindMyCar: () => void;
};

export function ProfileScreen({ onOpenFavorites, onOpenFindMyCar }: Props) {
  const items = [
    { label: 'My Test Drives', icon: '🚗' },
    { label: 'Favorite Cars', icon: '❤️', onPress: onOpenFavorites },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Settings', icon: '⚙️' },
    { label: 'Help & Support', icon: '💬' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }} style={styles.avatar} />
        <Text style={styles.name}>Ava Lewis</Text>
        <Text style={styles.email}>ava.lewis@example.com</Text>
        <Text style={styles.phone}>+1 (213) 555-0118</Text>
      </View>

      <View style={styles.menu}>
        {items.map(item => (
          <Pressable key={item.label} style={styles.menuItem} onPress={item.onPress ?? onOpenFindMyCar}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuText}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
  },
  name: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
  },
  email: {
    color: COLORS.muted,
    marginTop: 6,
  },
  phone: {
    color: COLORS.muted,
    marginTop: 4,
  },
  menu: {
    marginTop: 20,
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  menuText: {
    color: COLORS.text,
    fontWeight: '700',
    flex: 1,
  },
  chevron: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: '700',
  },
});
