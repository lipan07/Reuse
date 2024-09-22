import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { BASE_URL, TOKEN } from '@env';

const AddHousesApartments = ({ route }) => {
  const { category, subcategory, product } = route.params;
  console.log(product);
  const [formData, setFormData] = useState({
    propertyType: '',
    bedroom: '',
    bathroom: '',
    furnishing: '',
    constructionStatus: '',
    listedBy: '',
    carParking: '',
    facing: '',
    superBuiltupArea: '',
    carpetArea: '',
    maintenance: '',
    totalFloors: '',
    floorNo: '',
    projectName: '',
    adTitle: '',
    description: '',
    amount: '',
    images: [],
  });

  useEffect(() => {
    if (product) {
      // Populate form fields with existing product data
      setFormData({
        adTitle: product.post_details.title,
        description: product.post_details.description,
        amount: product.post_details.amount,
        propertyType: product.post_details.property_type,
        bedroom: product.post_details.bedrooms.toString(),
        bathroom: product.post_details.bathroom,
        furnishing: product.post_details.furnishing,
        constructionStatus: product.post_details.construction_status,
        listedBy: product.post_details.listed_by,
        carParking: product.post_details.car_parking,
        facing: product.post_details.facing,
        superBuiltupArea: product.post_details.super_builtup_area,
        carpetArea: product.post_details.carpet_area.toString(),
        maintenance: product.post_details.maintenance,
        totalFloors: product.post_details.total_floors,
        floorNo: product.post_details.floor_no,
        projectName: product.post_details.project_name,
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

  const handleOptionSelection = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setFormData({ ...formData, images: result.assets.map(asset => asset.uri) });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData.images.forEach((imageUri, index) => {
          formDataToSend.append('images[]', {
            uri: imageUri,
            type: 'image/jpeg',
            name: `image_${index}.jpg`,
          });
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append('category_id', subcategory.id);
    formDataToSend.append('guard_name', subcategory.guard_name);
    formDataToSend.append('post_type', 'sell');
    formDataToSend.append('address', 'India');

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${TOKEN}`
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Houses & Apartments details submitted successfully!',
          button: 'close',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Validation Error',
          textBody: responseData.message,
          button: 'close',
        });
      }
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'There was an issue submitting the form.',
        button: 'close',
      });
    }
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInset={{ bottom: 80 }} // Ensure content is not hidden under the button
          contentInsetAdjustmentBehavior="always"
        >
          {/* Type Selection */}
          <Text style={styles.label}>Type *</Text>
          <View style={styles.optionContainer}>
            {['Apartments', 'Builder Floors', 'Farm Houses', 'Houses & Villas'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, formData.propertyType === option && styles.selectedOption]}
                onPress={() => handleOptionSelection('propertyType', option)}
              >
                <Text style={formData.propertyType === option ? styles.selectedText : styles.optionText}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bedroom Selection */}
          <Text style={styles.label}>Bedroom *</Text>
          <View style={styles.optionContainer}>
            {['1', '2', '3', '4', '4+'].map((bedroom) => (
              <TouchableOpacity
                key={bedroom}
                style={[styles.optionButton, formData.bedroom === bedroom && styles.selectedOption]}
                onPress={() => handleOptionSelection('bedroom', bedroom)}
              >
                <Text style={formData.bedroom === bedroom ? styles.selectedText : styles.optionText}>{bedroom}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bathroom Selection */}
          <Text style={styles.label}>Bathroom *</Text>
          <View style={styles.optionContainer}>
            {['1', '2', '3', '4', '4+'].map((bathroom) => (
              <TouchableOpacity
                key={bathroom}
                style={[styles.optionButton, formData.bathroom === bathroom && styles.selectedOption]}
                onPress={() => handleOptionSelection('bathroom', bathroom)}
              >
                <Text style={formData.bathroom === bathroom ? styles.selectedText : styles.optionText}>{bathroom}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Facing */}
          <View style={styles.container}>
            <Text style={styles.label}>Facing *</Text>
            <Picker
              selectedValue={formData.facing}
              onValueChange={(value) => handleChange('facing', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select facing" value="" />
              <Picker.Item label="East" value="East" />
              <Picker.Item label="North" value="North" />
              <Picker.Item label="South" value="South" />
              <Picker.Item label="West" value="West" />
              <Picker.Item label="North-East" value="North-East" />
              <Picker.Item label="North-West" value="North-West" />
              <Picker.Item label="South-East" value="South-East" />
              <Picker.Item label="South-West" value="South-West" />
            </Picker>
          </View>

          {/* Furnishing Selection */}
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

          {/* Construction Status Selection */}
          <Text style={styles.label}>Construction Status *</Text>
          <View style={styles.optionContainer}>
            {['New Launch', 'Under Construction', 'Ready to Move'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, formData.constructionStatus === option && styles.selectedOption]}
                onPress={() => handleOptionSelection('constructionStatus', option)}
              >
                <Text style={formData.constructionStatus === option ? styles.selectedText : styles.optionText}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Listed By Selection */}
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

          {/* Car Parking Selection */}
          <Text style={styles.label}>Car Parking *</Text>
          <View style={styles.optionContainer}>
            {['0', '1', '2', '3', '3+'].map((parking) => (
              <TouchableOpacity
                key={parking}
                style={[styles.optionButton, formData.carParking === parking && styles.selectedOption]}
                onPress={() => handleOptionSelection('carParking', parking)}
              >
                <Text style={formData.carParking === parking ? styles.selectedText : styles.optionText}>{parking}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Super Builtup Area */}
          <Text style={styles.label}>Super Builtup Area (ft²)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Super Builtup Area"
            keyboardType="numeric"
            value={formData.superBuiltupArea}
            onChangeText={(value) => handleChange('superBuiltupArea', value)}
          />

          {/* Carpet Area */}
          <Text style={styles.label}>Carpet Area (ft²) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Carpet Area"
            keyboardType="numeric"
            value={formData.carpetArea}
            onChangeText={(value) => handleChange('carpetArea', value)}
          />


          {/* Ad Title Field */}
          <Text style={styles.label}>Ad Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Ad Title"
            value={formData.adTitle}
            onChangeText={(value) => handleChange('adTitle', value)}
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

          {/* Amount Field */}
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(value) => handleChange('amount', value)}
          />


          {/* Image Picker */}
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Text style={styles.imagePickerText}>Pick Images</Text>
          </TouchableOpacity>

          {/* Image Display */}
          <View style={styles.imageContainer}>
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
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 150, // Increase to avoid overlap
    paddingHorizontal: 16,
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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  stickyButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    zIndex: 1, // Ensure it's above the ScrollView
  },
});

export default AddHousesApartments;
