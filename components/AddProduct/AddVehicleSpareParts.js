import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddVehicleSpareParts = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    images: [],
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelection = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,  // Allow multiple image selection
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
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'Job details submitted successfully!');
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
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.formHeader}>Add: {subcategory.name}</Text>

        {/* Salary Period Selection */}
        <Text style={styles.label}>Type *</Text>
        <View style={styles.optionContainer}>
          {['Wheels & Tyres', 'Audio & Other Accessories', 'Others'].map((val) => (
            <TouchableOpacity
              key={val}
              style={[styles.optionButton, formData.type === val && styles.selectedOption]}
              onPress={() => handleSelection('type', val)}
            >
              <Text style={formData.type === val ? styles.selectedText : styles.optionText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Title Field */}
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
        />

        {/* Description Field */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Description"
          value={formData.description}
          multiline
          onChangeText={(value) => handleChange('description', value)}
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

      {/* Fixed Submit Button */}
      <View style={styles.stickyButton}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 100, // Ensure space for the submit button
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
    // justifyContent: 'space-around',
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
    fontSize: 16,
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
    marginBottom: 80, // Add space to ensure images don't hide under the button
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


export default AddVehicleSpareParts;
