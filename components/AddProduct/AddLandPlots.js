import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { submitForm } from '../../service/apiService';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const AddLandPlots = ({ route }) => {
  const { category, subcategory, product } = route.params;
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    listedBy: 'Owner',
    plotArea: '',
    length: '',
    breadth: '',
    projectName: '',
    adTitle: '',
    description: '',
    amount: '',
    facing: 'East',
    images: [],
  });

  useEffect(() => {
    if (product) {
      // Populate form fields with existing product data
      setFormData({
        id: product.id,
        listedBy: product.post_details.listed_by ?? '',
        plotArea: product.post_details.carpet_area ?? '',
        length: product.post_details.length ?? '',
        breadth: product.post_details.breadth ?? '',
        projectName: product.post_details.project_name ?? '',
        facing: product.post_details.facing ?? '',
        adTitle: product.title ?? '',
        description: product.post_details.description ?? '',
        images: product.images || [], // Set existing images
      });
    }
  }, [product]);

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
    submitForm(formData, subcategory)  // Use the centralized function
      .then((response) => {
        console.log('Form submitted successfully', response);
      })
      .catch((error) => {
        console.error('Error submitting form', error);
      });
  };

  return (
    <AlertNotificationRoot>
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

          {/* Facing */}
          <Text style={styles.label}>Facing *</Text>
          <View style={styles.optionContainer}>
            {['East', 'North', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map((facingOption) => (
              <TouchableOpacity
                key={facingOption}
                style={[styles.optionButton, formData.facing === facingOption && styles.selectedOption]}
                onPress={() => handleChange('facing', facingOption)}
              >
                <Text style={formData.facing === facingOption ? styles.selectedText : styles.optionText}>
                  {facingOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
            value={formData.adTitle}
            onChangeText={(value) => handleChange('adTitle', value)}
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
        {/* Fixed Submit Button */}
        <View style={styles.stickyButton}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
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
