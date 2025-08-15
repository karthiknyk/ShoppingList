module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      // ignore everything in node_modules EXCEPT react-native, @react-native, and expo packages
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|expo-modules-core)',
    ],
  };