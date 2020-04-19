import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapInput from './src/components/MapInput'

export default function App() {
  return (
    <View style={styles.container}>
      <MapInput/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  }
});
