// src/components/Loader.tsx

import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a slight background to enhance visibility
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // Ensure it overlays above other components
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
});

export default Loader;
