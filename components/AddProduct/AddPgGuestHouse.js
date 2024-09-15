import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPgGuestHouse = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    subtype: '',
    furnishing: '',
    listedBy: '',
    carParking: '',
    mealsIncluded: '',
    title: '',
    description: '',
    amount: '',
    images: [],  // Changed to handle multiple images
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionSelection = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Modified to handle multiple images
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,  // Allow multiple image selection
      // allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        images: [...formData.images, ...result.assets.map((asset) => asset.uri)], // Add selected images to the array
      });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData[key].forEach((image, index) => {
          formDataToSend.append(`image_${index}`, { uri: image, type: 'image/jpeg', name: `image_${index}.jpg` });
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('/api/pg-guesthouse', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'PG/Guesthouse details submitted successfully!');
      } else {
        console.error('Error submitting form:', response.statusText);
        Alert.alert('Error', 'There was an issue submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Subtype */}
        <Text style={styles.label}>Subtype *</Text>
        <View style={styles.optionContainer}>
          {['Guest House', 'PG', 'Roommate'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.subtype === option && styles.selectedOption]}
              onPress={() => handleOptionSelection('subtype', option)}
            >
              <Text style={formData.subtype === option ? styles.selectedText : styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Furnishing */}
        <Text style={styles.label}>Furnishing *</Text>
        <View style={styles.optionContainer}>
          {['Furnished', 'Semi-Furnished', 'Unfurnished'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.furnishing === option && styles.selectedOption]}
              onPress={() => handleOptionSelection('furnishing', option)}
            >
              <Text style={formData.furnishing === option ? styles.selectedText : styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Listed By */}
        <Text style={styles.label}>Listed By *</Text>
        <View style={styles.optionContainer}>
          {['Builder', 'Owner', 'Dealer'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.listedBy === option && styles.selectedOption]}
              onPress={() => handleOptionSelection('listedBy', option)}
            >
              <Text style={formData.listedBy === option ? styles.selectedText : styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Car Parking */}
        <Text style={styles.label}>Car Parking *</Text>
        <View style={styles.optionContainer}>
          {['1', '2', '3', '4', '5', '5+'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.carParking === option && styles.selectedOption]}
              onPress={() => handleOptionSelection('carParking', option)}
            >
              <Text style={formData.carParking === option ? styles.selectedText : styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Meals Included */}
        <Text style={styles.label}>Meals Included *</Text>
        <View style={styles.optionContainer}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.mealsIncluded === option && styles.selectedOption]}
              onPress={() => handleOptionSelection('mealsIncluded', option)}
            >
              <Text style={formData.mealsIncluded === option ? styles.selectedText : styles.optionText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
        />

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Description"
          value={formData.description}
          multiline
          onChangeText={(value) => handleChange('description', value)}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(value) => handleChange('amount', value)}
        />

        {/* Image Picker */}
        <Text style={styles.label}>Select Images</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          <Text style={styles.imagePickerText}>Pick images</Text>
        </TouchableOpacity>

        {/* Display Selected Images */}
        <View style={styles.imagesContainer}>
          {formData.images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.image} />
          ))}
        </View>
      </ScrollView>

      {/* Sticky Submit Button */}
      <View style={styles.stickyButton}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    color: '#007BFF',
  },
  selectedText: {
    color: '#fff',
  },
  imagePicker: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  stickyButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default AddPgGuestHouse;
