module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/async-storage.ts',
    '^react-native-maps$': '<rootDir>/__mocks__/react-native-maps.tsx',
  },
};
