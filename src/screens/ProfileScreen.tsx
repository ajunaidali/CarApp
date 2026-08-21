import React from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { User, useApp } from '../context/AppContext';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  onOpenFavorites: () => void;
  onOpenFindMyCar: () => void;
  user: User;
};

export function ProfileScreen({ onOpenFavorites, onOpenFindMyCar, user }: Props) {
  const { logout, themePreference, setThemePreference, updateUser } = useApp();
  const theme = useTheme();
  const [showSettings, setShowSettings] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [draft, setDraft] = React.useState(user);

  const items = [
    { label: 'My Test Drives', icon: '🚗' },
    { label: 'Favorite Cars', icon: '❤️', onPress: onOpenFavorites },
    { label: 'Settings', icon: '⚙️', onPress: () => setShowSettings(true) },
    { label: 'Logout', icon: '↪', isLogout: true, onPress: () => setShowLogoutConfirm(true) },
  ];

  const confirmLogout = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {user.avatar ? <Image source={{ uri: user.avatar }} style={styles.avatar} /> : <View style={[styles.avatarFallback, { backgroundColor: theme.gold }]}><Text style={[styles.avatarText, { color: theme.background }]}>{user.fullName.charAt(0).toUpperCase()}</Text></View>}
        <Text style={[styles.name, { color: theme.text }]}>{user.fullName}</Text>
        <Text style={[styles.email, { color: theme.muted }]}>@{user.username} · {user.email}</Text>
        <Text style={[styles.phone, { color: theme.muted }]}>{user.phone || 'Add a phone number in profile settings'}</Text>
        <Pressable style={[styles.editButton, { borderColor: theme.gold }]} onPress={() => { setDraft(user); setShowEdit(true); }}><Text style={[styles.editText, { color: theme.gold }]}>Edit Profile</Text></Pressable>
      </View>

      <Modal visible={showSettings} transparent animationType="slide" onRequestClose={() => setShowSettings(false)}>
        <View style={styles.modalBackdrop}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={[styles.settingsSheet, { backgroundColor: theme.surface }]} contentContainerStyle={styles.sheetContent} keyboardShouldPersistTaps="handled">
            <View style={styles.settingsHeader}>
              <Text style={[styles.settingsTitle, { color: theme.text }]}>Settings</Text>
              <Pressable onPress={() => setShowSettings(false)}><Text style={[styles.close, { color: theme.gold }]}>Done</Text></Pressable>
            </View>
            <Text style={[styles.appearance, { color: theme.muted }]}>Appearance</Text>
            {(['light', 'dark', 'system'] as const).map(option => (
              <Pressable key={option} style={styles.themeOption} onPress={() => setThemePreference(option)}>
                <Text style={[styles.radio, { color: theme.gold }]}>{themePreference === option ? '●' : '○'}</Text>
                <Text style={[styles.themeText, { color: theme.text }]}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </Pressable>
            ))}
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Modal visible={showEdit} transparent animationType="slide" onRequestClose={() => setShowEdit(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.settingsSheet, { backgroundColor: theme.surface }]}>
            <View style={styles.settingsHeader}>
              <Text style={[styles.settingsTitle, { color: theme.text }]}>Edit Profile</Text>
              <Pressable onPress={() => setShowEdit(false)}><Text style={[styles.close, { color: theme.gold }]}>Cancel</Text></Pressable>
            </View>
            {(['username', 'fullName', 'email', 'phone', 'avatar'] as const).map(field => (
              <TextInput key={field} style={[styles.editInput, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]} placeholder={field === 'fullName' ? 'Full name' : field === 'avatar' ? 'Avatar image URL' : field.charAt(0).toUpperCase() + field.slice(1)} placeholderTextColor={theme.muted} value={draft[field] ?? ''} onChangeText={value => setDraft(current => ({ ...current, [field]: value }))} />
            ))}
            <Pressable style={[styles.saveButton, { backgroundColor: theme.gold }]} onPress={() => { updateUser(draft); setShowEdit(false); }}><Text style={[styles.saveText, { color: theme.background }]}>Save Changes</Text></Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showLogoutConfirm} transparent animationType="fade" onRequestClose={() => setShowLogoutConfirm(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.logoutSheet, { backgroundColor: theme.surface }]}>
            <Text style={[styles.logoutTitle, { color: theme.text }]}>Logout</Text>
            <Text style={[styles.logoutMessage, { color: theme.muted }]}>Are you sure you want to logout?</Text>
            <View style={styles.logoutActions}>
              <Pressable onPress={() => setShowLogoutConfirm(false)} style={[styles.cancelAction, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.cancelActionText, { color: theme.text }]}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmLogout} style={[styles.logoutAction, { backgroundColor: theme.error }]}>
                <Text style={styles.logoutActionText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.menu}>
        {items.map(item => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.menuItem,
              {
                backgroundColor: item.isLogout ? 'rgba(242, 97, 97, 0.08)' : theme.card,
                borderColor: item.isLogout ? 'rgba(242, 97, 97, 0.32)' : theme.border,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            onPress={item.onPress ?? onOpenFindMyCar}
          >
            <Text style={[styles.menuIcon, { color: item.isLogout ? theme.error : theme.text }]}>{item.icon}</Text>
            <Text style={[styles.menuText, { color: item.isLogout ? theme.error : theme.text }]}>{item.label}</Text>
            <Text style={[styles.chevron, { color: item.isLogout ? theme.error : theme.gold }]}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18 },
  content: { paddingTop: 18, paddingBottom: 36 },
  profileCard: { borderRadius: 28, borderWidth: 1, padding: 24, alignItems: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 14 },
  avatarFallback: { width: 110, height: 110, borderRadius: 55, marginBottom: 14, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 44, fontWeight: '900' },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  settingsSheet: { borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 34 },
  sheetContent: { paddingBottom: 34 },
  logoutSheet: { marginHorizontal: 18, borderRadius: 20, padding: 20, marginBottom: 28 },
  settingsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingsTitle: { fontSize: 24, fontWeight: '800' },
  close: { fontWeight: '800' },
  appearance: { marginTop: 28, marginBottom: 10, textTransform: 'uppercase', fontSize: 12, fontWeight: '800' },
  themeOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  radio: { fontSize: 20, width: 32 },
  themeText: { fontSize: 16, fontWeight: '700' },
  editButton: { marginTop: 16, borderWidth: 1, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 10 },
  editText: { fontWeight: '800' },
  editInput: { borderRadius: 12, borderWidth: 1, padding: 13, marginTop: 12 },
  saveButton: { borderRadius: 12, alignItems: 'center', padding: 14, marginTop: 16 },
  saveText: { fontWeight: '900' },
  name: { fontSize: 24, fontWeight: '800' },
  email: { marginTop: 6 },
  phone: { marginTop: 4 },
  menu: { marginTop: 20, gap: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 16 },
  menuIcon: { fontSize: 22, marginRight: 12 },
  menuText: { fontWeight: '700', flex: 1 },
  chevron: { fontSize: 24, fontWeight: '700' },
  logoutTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  logoutMessage: { marginTop: 12, fontSize: 16, textAlign: 'center', lineHeight: 24 },
  logoutActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 12 },
  cancelAction: { flex: 1, borderWidth: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  cancelActionText: { fontWeight: '800' },
  logoutAction: { flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  logoutActionText: { color: '#FFFFFF', fontWeight: '800' },
});
