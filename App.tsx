import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppProvider, useApp } from './src/context/AppContext';
import { ThemeProvider } from './src/theme/ThemeContext';

function AppShell() {
  const { isDark } = useApp();

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0B0B0B' : '#F7F7F5' }]} edges={['top', 'bottom']}><AppNavigator /></SafeAreaView>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
