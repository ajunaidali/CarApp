import React from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { User, useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';

type Props = {
  onOpenFavorites: () => void;
  onOpenFindMyCar: () => void;
  user: User;
};

export function ProfileScreen({ onOpenFavorites, onOpenFindMyCar, user }: Props) {
  const { logout, themePreference, setThemePreference, updateUser } = useApp();
  const [showSettings, setShowSettings] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [draft, setDraft] = React.useState(user);
  const items = [
    { label: 'My Test Drives', icon: '🚗' },
    { label: 'Favorite Cars', icon: '❤️', onPress: onOpenFavorites },
    { label: 'Notifications', icon: '🔔' },
    { label: 'Settings', icon: '⚙️', onPress: () => setShowSettings(true) },
    { label: 'Help & Support', icon: '💬' },
    { label: 'Logout', icon: '↪', onPress: () => Alert.alert('Logout', 'Are you sure you want to logout?', [{ text: 'Cancel' }, { text: 'Logout', style: 'destructive', onPress: logout }]) },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : <View style={styles.avatarFallback}><Text style={styles.avatarText}>{user.fullName.charAt(0).toUpperCase()}</Text></View>}
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>@{user.username} · {user.email}</Text>
        <Text style={styles.phone}>{user.phone || 'Add a phone number in profile settings'}</Text>
        <Pressable style={styles.editButton} onPress={() => { setDraft(user); setShowEdit(true); }}><Text style={styles.editText}>Edit Profile</Text></Pressable>
      </View>
      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}><View style={styles.modalBackdrop}><View style={styles.settingsSheet}><View style={styles.settingsHeader}><Text style={styles.settingsTitle}>Settings</Text><Pressable onPress={() => setShowSettings(false)}><Text style={styles.close}>Done</Text></Pressable></View><Text style={styles.appearance}>Appearance</Text>{(['light', 'dark', 'system'] as const).map(option => <Pressable key={option} style={styles.themeOption} onPress={() => setThemePreference(option)}><Text style={styles.radio}>{themePreference === option ? '●' : '○'}</Text><Text style={styles.themeText}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text></Pressable>)}</View></View></Modal>
      <Modal visible={showEdit} transparent animationType="slide" onRequestClose={() => setShowEdit(false)}><View style={styles.modalBackdrop}><View style={styles.settingsSheet}><View style={styles.settingsHeader}><Text style={styles.settingsTitle}>Edit Profile</Text><Pressable onPress={() => setShowEdit(false)}><Text style={styles.close}>Cancel</Text></Pressable></View>{(['username', 'fullName', 'email', 'phone'] as const).map(field => <TextInput key={field} style={styles.editInput} placeholder={field === 'fullName' ? 'Full name' : field.charAt(0).toUpperCase() + field.slice(1)} placeholderTextColor={COLORS.muted} value={draft[field]} onChangeText={value => setDraft(current => ({ ...current, [field]: value }))} />)}<Pressable style={styles.saveButton} onPress={() => { updateUser(draft); setShowEdit(false); }}><Text style={styles.saveText}>Save Changes</Text></Pressable></View></View></Modal>

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
  avatarFallback: { width: 110, height: 110, borderRadius: 55, marginBottom: 14, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.background, fontSize: 44, fontWeight: '900' },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  settingsSheet: { backgroundColor: COLORS.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34 },
  settingsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingsTitle: { color: COLORS.text, fontSize: 24, fontWeight: '800' },
  close: { color: COLORS.gold, fontWeight: '800' },
  appearance: { color: COLORS.muted, marginTop: 28, marginBottom: 10, textTransform: 'uppercase', fontSize: 12, fontWeight: '800' },
  themeOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  radio: { color: COLORS.gold, fontSize: 20, width: 32 },
  themeText: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  editButton: { marginTop: 16, borderWidth: 1, borderColor: COLORS.gold, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 10 },
  editText: { color: COLORS.gold, fontWeight: '800' },
  editInput: { backgroundColor: COLORS.input, color: COLORS.text, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, padding: 13, marginTop: 12 },
  saveButton: { backgroundColor: COLORS.gold, borderRadius: 12, alignItems: 'center', padding: 14, marginTop: 16 },
  saveText: { color: COLORS.background, fontWeight: '900' },
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
