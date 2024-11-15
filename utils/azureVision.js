import axios from 'axios';

export const classifyImage = async (imageUri) => {
  try {
    const payload = {
      access_token: "49NgyLxch5RiNQv", // Replace with a valid token
      model_version: "crop_health:1.1.1",
      custom_id: null,
      input: {
        latitude: 49.207,
        longitude: 16.608,
        similar_images: true,
        images: [imageUri], // Use the provided image URI
        datetime: new Date().toISOString(),
      },
    };

    const response = await axios.post(
      'https://crop.kindwise.com/api/v1/identification',
      payload,
      {
        headers: {
          'Api-Key': 'yOhYSeZ9hEHSzfdT1keszSGvsEDrFrZgOzMQ9yeEfaSzRvi94u', // Replace with your actual API key
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.disease) {
      const suggestions = response.data.disease.suggestions;
      if (suggestions && suggestions.length > 0) {
        return { disease: suggestions[0].name };
      } else {
        return { error: 'Disease detected but no suggestions available.' };
      }
    } else {
      return { error: 'Invalid response or no disease detected.' };
    }
  } catch (error) {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      return { error: `Request failed with status ${error.response.status}: ${error.response.data?.message || 'Unknown error'}` };
    } else if (error.request) {
      console.error('No Response:', error.request);
      return { error: 'No response received from the server.' };
    } else {
      console.error('Error Message:', error.message);
      return { error: 'An unexpected error occurred. Please check your network or credentials.' };
    }
  }
};
