import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detection Results</Text>
      <Text style={styles.result}>Detected: {data.tag}</Text>
      <Text style={styles.probability}>
        Confidence: {(data.probability * 100).toFixed(2)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  result: { fontSize: 18, marginBottom: 10 },
  probability: { fontSize: 16, color: 'gray' },
});
