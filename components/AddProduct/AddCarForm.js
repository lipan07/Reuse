import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddCarForm = ({ route }) => {
  const { category } = route.params;
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

    try {
      const response = await fetch('/api/car', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'Car details submitted successfully!');
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
        <Text style={styles.formHeader}>
          Add Product - {category.name}
        </Text>

        {/* Brand Field */}
        <Text style={styles.label}>Brand:</Text>
        <Picker
          selectedValue={formData.brand}
          onValueChange={(value) => handleChange('brand', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Brand" value="" />
          <Picker.Item label="Maruti Suzuki" value="maruti-suzuki" />
          <Picker.Item label="Hyundai" value="hyundai" />
          <Picker.Item label="Tata" value="tata" />
          <Picker.Item label="Mahindra" value="mahindra" />
          <Picker.Item label="Toyota" value="toyota" />
          <Picker.Item label="Honda" value="cars-honda" />
          <Picker.Item label="BYD" value="byd" />
          <Picker.Item label="Audi" value="audi-1" />
          <Picker.Item label="Ambassador" value="ambassador-1" />
          <Picker.Item label="Ashok" value="ashok-1" />
          <Picker.Item label="Ashok Leyland" value="ashok-leyland-1" />
          <Picker.Item label="Aston Martin" value="aston-martin-1" />
          <Picker.Item label="Bajaj" value="bajaj" />
          <Picker.Item label="Bentley" value="bentley-1" />
          <Picker.Item label="Citroen" value="citroen-1" />
          <Picker.Item label="Tesla" value="tesla-1" />
          <Picker.Item label="BMW" value="bmw" />
          <Picker.Item label="Bugatti" value="bugatti" />
          <Picker.Item label="Cadillac" value="cadillac" />
          <Picker.Item label="Chevrolet" value="chevrolet" />
          <Picker.Item label="Chrysler" value="chrysler" />
          <Picker.Item label="Daewoo" value="daewoo" />
          <Picker.Item label="Datsun" value="datsun" />
          <Picker.Item label="Dc" value="dc" />
          <Picker.Item label="Eicher Polaris" value="eicher-polaris" />
          <Picker.Item label="Ferrari" value="ferrari" />
          <Picker.Item label="Fiat" value="fiat" />
          <Picker.Item label="Force Motors" value="force-motors" />
          <Picker.Item label="Ford" value="ford" />
          <Picker.Item label="Hummer" value="hummer" />
          <Picker.Item label="ICML" value="icml" />
          <Picker.Item label="Isuzu" value="isuzu" />
          <Picker.Item label="Jaguar" value="jaguar" />
          <Picker.Item label="Jeep" value="jeep" />
          <Picker.Item label="Kia" value="kia" />
          <Picker.Item label="Lamborghini" value="lamborghini" />
          <Picker.Item label="Land Rover" value="land-rover" />
          <Picker.Item label="Lexus" value="lexus" />
          <Picker.Item label="Mahindra Renault" value="mahindra-renault" />
          <Picker.Item label="Maserati" value="maserati" />
          <Picker.Item label="Maybach" value="maybach" />
          <Picker.Item label="Mazda" value="mazda" />
          <Picker.Item label="Mercedes-Benz" value="mercedes-benz" />
          <Picker.Item label="MG" value="mg" />
          <Picker.Item label="Mini" value="mini" />
          <Picker.Item label="Mitsubishi" value="mitsubishi" />
          <Picker.Item label="Nissan" value="nissan" />
          <Picker.Item label="Opel" value="opel" />
          <Picker.Item label="Porsche" value="porsche" />
          <Picker.Item label="Premier" value="premier" />
          <Picker.Item label="Renault" value="renault" />
          <Picker.Item label="Rolls-Royce" value="rolls-royce" />
          <Picker.Item label="Skoda" value="skoda" />
          <Picker.Item label="Ssangyong" value="ssangyong" />
          <Picker.Item label="Volkswagen" value="volkswagen" />
          <Picker.Item label="Volvo" value="volvo" />
          <Picker.Item label="Others" value="Others" />
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
