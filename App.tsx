import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { ThemeProvider } from './src/theme/ThemeContext';

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}><AppNavigator /></View>
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
});

export default App;
