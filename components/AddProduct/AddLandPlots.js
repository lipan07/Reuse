import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddLandPlots = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    listedBy: '',
    fuelType: '',
    plotArea: '',
    length: '',
    breadth: '',
    projectName: '',
    title: '',
    description: '',
    amount: '',
    facing: '',
    images: [],
  });
  const [images, setImages] = useState([]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/land-plots', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'Land/Plot details submitted successfully!');
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Listed By */}
        <Text style={styles.label}>Listed By *</Text>
        <View style={styles.optionContainer}>
          {['Dealer', 'Owner', 'Builder'].map((listedByOption) => (
            <TouchableOpacity
              key={listedByOption}
              style={[styles.optionButton, formData.listedBy === listedByOption && styles.selectedOption]}
              onPress={() => handleChange('listedBy', listedByOption)}
            >
              <Text style={formData.listedBy === listedByOption ? styles.selectedText : styles.optionText}>
                {listedByOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fuel Type */}
        <Text style={styles.label}>Fuel Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Fuel Type"
          value={formData.fuelType}
          onChangeText={(value) => handleChange('fuelType', value)}
        />

        {/* Plot Area */}
        <Text style={styles.label}>Plot Area (ft²) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Plot Area"
          keyboardType="numeric"
          value={formData.plotArea}
          onChangeText={(value) => handleChange('plotArea', value)}
        />

        {/* Length */}
        <Text style={styles.label}>Length (ft)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Length"
          keyboardType="numeric"
          value={formData.length}
          onChangeText={(value) => handleChange('length', value)}
        />

        {/* Breadth */}
        <Text style={styles.label}>Breadth (ft)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Breadth"
          keyboardType="numeric"
          value={formData.breadth}
          onChangeText={(value) => handleChange('breadth', value)}
        />

        {/* Project Name */}
        <Text style={styles.label}>Project Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Name"
          value={formData.projectName}
          onChangeText={(value) => handleChange('projectName', value)}
        />

        {/* Title */}
        <Text style={styles.label}>Ad Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Ad Title"
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

        {/* Facing */}
        <Text style={styles.label}>Facing *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Facing (East, North, etc.)"
          value={formData.facing}
          onChangeText={(value) => handleChange('facing', value)}
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

export default AddLandPlots;
