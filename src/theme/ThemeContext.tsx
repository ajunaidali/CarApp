import React, { createContext, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { COLORS } from './colors';
const ThemeContext = createContext(COLORS);
export function ThemeProvider({ children }: { children: React.ReactNode }) { const { isDark } = useApp(); const colors = isDark ? COLORS : { ...COLORS, background: '#F7F7F5', surface: '#FFFFFF', card: '#FFFFFF', cardAlt: '#F0F0EC', text: '#171717', muted: '#686868', input: '#F1F1ED', border: 'rgba(130, 102, 20, 0.25)' }; return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>; }
export function useTheme() { return useContext(ThemeContext); }