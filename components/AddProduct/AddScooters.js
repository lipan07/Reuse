import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddScooters = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    brand: '',
    title: '',
    year: '',
    km_driven: '',
    description: '',
    amount: '',
    images: [],
  });

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
      const response = await fetch('/api/mobile-tablets', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'Mobile/Tablet details submitted successfully!');
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
        <Text style={styles.formHeader}>Add Scooters</Text>

        {/* Brand Selection */}
        <Text style={styles.label}>Brand *</Text>
        <Picker
          selectedValue={formData.brand}
          onValueChange={(value) => handleChange('brand', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Brand" value="" />
          <Picker.Item value="scooters-vespa" label="Vespa" />
          <Picker.Item value="scooters-ampere" label="Ampere" />
          <Picker.Item value="scooters-ather" label="Ather" />
          <Picker.Item value="scooters-ola" label="OLA" />
          <Picker.Item value="scooters-husqvarna" label="Husqvarna" />
          <Picker.Item value="scooters-yamaha" label="Yamaha" />
          <Picker.Item value="scooters-vida" label="Vida" />
          <Picker.Item value="scooters-chetak" label="Chetak" />
          <Picker.Item value="scooters-bgauss" label="BGauss" />
          <Picker.Item value="scooters-bmw" label="BMW" />
          <Picker.Item value="22kymco" label="22Kymco" />
          <Picker.Item value="aprilia" label="Aprilia" />
          <Picker.Item value="avan-motors" label="Avan Motors" />
          <Picker.Item value="benling" label="Benling" />
          <Picker.Item value="bounce" label="Bounce" />
          <Picker.Item value="eeve" label="EeVe" />
          <Picker.Item value="eider" label="Eider" />
          <Picker.Item value="evolet" label="Evolet" />
          <Picker.Item value="gemopai" label="Gemopai" />
          <Picker.Item value="hero-electric" label="Hero Electric" />
          <Picker.Item value="hero-honda" label="Hero Honda" />
          <Picker.Item value="hyosung" label="Hyosung" />
          <Picker.Item value="ivoomi" label="iVOOMi" />
          <Picker.Item value="joy-e-bike" label="Joy e-bike" />
          <Picker.Item value="kinetic" label="Kinetic" />
          <Picker.Item value="lambretta" label="Lambretta" />
          <Picker.Item value="lml" label="LML" />
          <Picker.Item value="odysse" label="Odysse" />
          <Picker.Item value="okaya" label="Okaya" />
          <Picker.Item value="okinawa" label="Okinawa" />
          <Picker.Item value="piaggio" label="Piaggio" />
          <Picker.Item value="pure-ev" label="PURE EV" />
          <Picker.Item value="simple-energy" label="Simple Energy" />
          <Picker.Item value="techo-electra" label="Techo Electra" />
          <Picker.Item value="twenty-two-motors" label="Twenty Two Motors" />
          <Picker.Item value="um" label="UM" />
          <Picker.Item value="yo" label="Yo" />
          <Picker.Item value="bajaj" label="Bajaj" />
          <Picker.Item value="hero-scooter" label="Hero" />
          <Picker.Item value="scooters-honda" label="Honda" />
          <Picker.Item value="mahindra-scooter" label="Mahindra" />
          <Picker.Item value="suzuki-scooter" label="Suzuki" />
          <Picker.Item value="tvs-scooter" label="TVS" />
          <Picker.Item value="other-brands" label="Other Brands" />
        </Picker>

        {/* Year Field */}
        <Text style={styles.label}>Year *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter year"
          value={formData.year}
          onChangeText={(value) => handleChange('year', value)}
        />
        {/* Title Field */}
        <Text style={styles.label}>KM Driven *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter KM driven"
          value={formData.km_driven}
          onChangeText={(value) => handleChange('km_driven', value)}
        />
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
    paddingBottom: 100, // Increased bottom padding to make space for the fixed submit button
    flexGrow: 1,
    justifyContent: 'center',
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
    padding: 10,
    marginBottom: 20,
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
    marginBottom: 100, // Added margin to ensure images are visible above the submit button
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});


export default AddScooters;
