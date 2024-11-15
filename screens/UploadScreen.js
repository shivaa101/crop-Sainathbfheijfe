import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { classifyImage } from '../utils/azureVision';
import Loader from '../components/Loader';

export default function UploadScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const response = await classifyImage(image);
    setLoading(false);

    if (response.error) {
      setResult(response.error);
    } else {
      navigation.navigate('Results', { data: response });
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Button title="Analyze Image" onPress={analyzeImage} />}
      {loading && <Loader />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, marginBottom: 20 },
  result: { marginTop: 20, fontSize: 18, color: 'blue' },
});
