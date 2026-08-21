import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export type ThemePreference = 'light' | 'dark' | 'system';
export type User = { username: string; fullName: string; email: string; phone: string; avatar?: string };
type AppContextValue = {
  hydrated: boolean; user: User | null; favorites: string[]; compareIds: string[]; themePreference: ThemePreference; isDark: boolean;
  login: (user: User) => Promise<void>; signup: (user: User) => Promise<void>; logout: () => Promise<void>; updateUser: (user: User) => Promise<void>;
  toggleFavorite: (id: string) => void; toggleCompare: (id: string) => void; clearCompare: () => void; setThemePreference: (theme: ThemePreference) => void;
};
const AppContext = createContext<AppContextValue | null>(null);
const STORAGE_KEY = '@carapp_state';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(value => { if (value) { const state = JSON.parse(value); setUser(state.user ?? null); setFavorites(state.favorites ?? []); setCompareIds(state.compareIds ?? []); setThemePreferenceState(state.themePreference ?? 'system'); } }).catch(() => undefined).finally(() => setHydrated(true));
  }, []);
  const persist = (next: object) => AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  const login = async (nextUser: User) => { setUser(nextUser); persist({ user: nextUser }); };
  const signup = async (nextUser: User) => { setUser(nextUser); persist({ user: nextUser }); };
  const logout = async () => {
    setUser(null);
    setFavorites([]);
    setCompareIds([]);
    persist({ user: null, favorites: [], compareIds: [] });
  };
  const updateUser = async (nextUser: User) => { setUser(nextUser); persist({ user: nextUser }); };
  const toggleFavorite = (id: string) => setFavorites(current => { const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id]; persist({ favorites: next }); return next; });
  const toggleCompare = (id: string) => setCompareIds(current => { const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id]; persist({ compareIds: next }); return next; });
  const clearCompare = () => { setCompareIds([]); persist({ compareIds: [] }); };
  const setThemePreference = (next: ThemePreference) => { setThemePreferenceState(next); persist({ themePreference: next }); };
  const isDark = themePreference === 'dark' || (themePreference === 'system' && Appearance.getColorScheme() === 'dark');
  const value = useMemo(() => ({ hydrated, user, favorites, compareIds, themePreference, isDark, login, signup, logout, updateUser, toggleFavorite, toggleCompare, clearCompare, setThemePreference }), [hydrated, user, favorites, compareIds, themePreference, isDark]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used inside AppProvider'); return context; }