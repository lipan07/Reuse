import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { submitForm } from '../../service/apiService';

const AddCarForm = ({ route }) => {
  const { category, subcategory, product } = route.params;
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuelType: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    adTitle: '',
    description: '',
    amount: '',
    images: [], // Updated to handle multiple images
  });

  useEffect(() => {
    if (product) {
      // Populate form fields with existing product data
      setFormData({
        id: product.id,
        adTitle: product.post_details.title ?? '',
        description: product.post_details.description ?? '',
        amount: product.post_details.amount ?? '',
        kmDriven: product.post_details.km_driven.toString() ?? '',
        brand: product.post_details.brand ?? '',
        year: product.post_details.year ?? '',
        transmission: product.post_details.transmission ?? '',
        owners: product.post_details.no_of_owner ?? '',
        fuelType: product.post_details.fuel ?? '',
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

  const handleFuelSelection = (type) => {
    setFormData({ ...formData, fuelType: type });
  };

  const handleTransmissionSelection = (type) => {
    setFormData({ ...formData, transmission: type });
  };

  const handleOwnersSelection = (type) => {
    setFormData({ ...formData, owners: type });
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        images: [...formData.images, ...result.assets.map((asset) => asset.uri)],
      });
    }
  };

  const handleSubmit = async () => {
    submitForm(formData, category)  // Use the centralized function
      .then((response) => {
        console.log('Form submitted successfully', response);
      })
      .catch((error) => {
        console.error('Error submitting form', error);
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.formHeader}>
            Add Product - {category.name || subcategory.name}
          </Text>

          {/* Brand Field */}
          <Text style={styles.label}>Brand:</Text>
          <Picker
            selectedValue={formData.brand}
            onValueChange={(value) => handleChange('brand', value)}
            style={styles.input}
          >
            <Picker.Item label="Select Brand" value="" />
            <Picker.Item label="Maruti Suzuki" value="Maruti Suzuki" />
            <Picker.Item label="Hyundai" value="Hyundai" />
            <Picker.Item label="Tata" value="Tata" />
            <Picker.Item label="Mahindra" value="Mahindra" />
            <Picker.Item label="Toyota" value="Toyota" />
            <Picker.Item label="Honda" value="Honda" />
            <Picker.Item label="BYD" value="BYD" />
            <Picker.Item label="Audi" value="Audi" />
            <Picker.Item label="Ambassador" value="Ambassador" />
            <Picker.Item label="Ashok" value="Ashok" />
            <Picker.Item label="Ashok Leyland" value="Ashok Leyland" />
            <Picker.Item label="Aston" value="Aston" />
            <Picker.Item label="Aston Martin" value="Aston Martin" />
            <Picker.Item label="Bajaj" value="Bajaj" />
            <Picker.Item label="Bentley" value="Bentley" />
            <Picker.Item label="Citroen" value="Citroen" />
            <Picker.Item label="McLaren" value="McLaren" />
            <Picker.Item label="Fisker" value="Fisker" />
            <Picker.Item label="BMW" value="BMW" />
            <Picker.Item label="Bugatti" value="Bugatti" />
            <Picker.Item label="Cadillac" value="Cadillac" />
            <Picker.Item label="Caterham" value="Caterham" />
            <Picker.Item label="Chevrolet" value="Chevrolet" />
            <Picker.Item label="Chrysler" value="Chrysler" />
            <Picker.Item label="Conquest" value="Conquest" />
            <Picker.Item label="Daewoo" value="Daewoo" />
            <Picker.Item label="Datsun" value="Datsun" />
            <Picker.Item label="Dc" value="Dc" />
            <Picker.Item label="Dodge" value="Dodge" />
            <Picker.Item label="Eicher Polaris" value="Eicher Polaris" />
            <Picker.Item label="Ferrari" value="Ferrari" />
            <Picker.Item label="Fiat" value="Fiat" />
            <Picker.Item label="Force Motors" value="Force Motors" />
            <Picker.Item label="Ford" value="Ford" />
            <Picker.Item label="Hummer" value="Hummer" />
            <Picker.Item label="ICML" value="ICML" />
            <Picker.Item label="Infiniti" value="Infiniti" />
            <Picker.Item label="Isuzu" value="Isuzu" />
            <Picker.Item label="Jaguar" value="Jaguar" />
            <Picker.Item label="Jeep" value="Jeep" />
            <Picker.Item label="Kia" value="Kia" />
            <Picker.Item label="Lamborghini" value="Lamborghini" />
            <Picker.Item label="Land Rover" value="Land Rover" />
            <Picker.Item label="Lexus" value="Lexus" />
            <Picker.Item label="Mahindra Renault" value="Mahindra Renault" />
            <Picker.Item label="Maserati" value="Maserati" />
            <Picker.Item label="Maybach" value="Maybach" />
            <Picker.Item label="Mazda" value="Mazda" />
            <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
            <Picker.Item label="MG" value="MG" />
            <Picker.Item label="Mini" value="Mini" />
            <Picker.Item label="Mitsubishi" value="Mitsubishi" />
            <Picker.Item label="Nissan" value="Nissan" />
            <Picker.Item label="Opel" value="Opel" />
            <Picker.Item label="Peugeot" value="Peugeot" />
            <Picker.Item label="Porsche" value="Porsche" />
            <Picker.Item label="Premier" value="Premier" />
            <Picker.Item label="Renault" value="Renault" />
            <Picker.Item label="Rolls-Royce" value="Rolls-Royce" />
            <Picker.Item label="San" value="San" />
            <Picker.Item label="Sipani" value="Sipani" />
            <Picker.Item label="Skoda" value="Skoda" />
            <Picker.Item label="Smart" value="Smart" />
            <Picker.Item label="Ssangyong" value="Ssangyong" />
            <Picker.Item label="Subaru" value="Subaru" />
            <Picker.Item label="Volkswagen" value="Volkswagen" />
            <Picker.Item label="Volvo" value="Volvo" />
            <Picker.Item label="Other Brands" value="Other Brands" />
          </Picker>

          {/* Year Field */}
          <Text style={styles.label}>Year *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Year"
            keyboardType="numeric"
            value={formData.year}
            onChangeText={(value) => handleChange('year', value)}
          />

          {/* Fuel Type Selection */}
          <Text style={styles.label}>Fuel Type *</Text>
          <View style={styles.optionContainer}>
            {['CNG & Hybrids', 'Diesel', 'Electric', 'LPG', 'Petrol'].map((fuel) => (
              <TouchableOpacity
                key={fuel}
                style={[styles.optionButton, formData.fuelType === fuel && styles.selectedOption]}
                onPress={() => handleFuelSelection(fuel)}
              >
                <Text style={formData.fuelType === fuel ? styles.selectedText : styles.optionText}>{fuel}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Transmission Selection */}
          <Text style={styles.label}>Transmission *</Text>
          <View style={styles.optionContainer}>
            {['Automatic', 'Manual'].map((trans) => (
              <TouchableOpacity
                key={trans}
                style={[styles.optionButton, formData.transmission === trans && styles.selectedOption]}
                onPress={() => handleTransmissionSelection(trans)}
              >
                <Text style={formData.transmission === trans ? styles.selectedText : styles.optionText}>{trans}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* KM Driven Field */}
          <Text style={styles.label}>KM Driven *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter KM Driven"
            keyboardType="numeric"
            value={formData.kmDriven}
            onChangeText={(value) => handleChange('kmDriven', value)}
          />

          {/* Number of Owners Selection */}
          <Text style={styles.label}>Number of Owners *</Text>
          <View style={styles.optionContainer}>
            {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((owner) => (
              <TouchableOpacity
                key={owner}
                style={[styles.optionButton, formData.owners === owner && styles.selectedOption]}
                onPress={() => handleOwnersSelection(owner)}
              >
                <Text style={formData.owners === owner ? styles.selectedText : styles.optionText}>{owner}</Text>
              </TouchableOpacity>
            ))}
          </View>

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
    </>
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
    justifyContent: 'center', // Center the content vertically
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    height: 50,
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
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 80, // Increase bottom margin to ensure space for the submit button
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  stickyButton: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});


export default AddCarForm;
