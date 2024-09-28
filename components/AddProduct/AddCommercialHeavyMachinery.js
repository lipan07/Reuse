import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { submitForm } from '../../service/apiService';

const AddCommercialHeavyMachinery = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuelType: '',
    transmission: '',
    condition: '',
    owners: '',
    listedBy: '',
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

  const handleConditionSelection = (type) => {
    setFormData({ ...formData, conditionType: type });
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
    submitForm(formData, subcategory)  // Use the centralized function
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
            <Picker.Item value="caterpillar" label="Caterpillar" />
            <Picker.Item value="jcb" label="JCB" />
            <Picker.Item value="tata_hitachi" label="Tata Hitachi" />
            <Picker.Item value="volvo" label="Volvo" />
            <Picker.Item value="komatsu" label="Komatsu" />
            <Picker.Item value="l_t_c_e" label="L&T Construction Equipment" />
            <Picker.Item value="beml" label="BEML (Bharat Earth Movers Limited)" />
            <Picker.Item value="h_c_e" label="Hyundai Construction Equipment" />
            <Picker.Item value="sany" label="SANY" />
            <Picker.Item value="cc" label="Case Construction" />
            <Picker.Item value="doosan" label="Doosan" />
            <Picker.Item value="mce" label="Mahindra Construction Equipment" />
            <Picker.Item value="liugong" label="LiuGong" />
            <Picker.Item value="john_deere" label="John Deere" />
            <Picker.Item value="xcmg" label="XCMG" />
            <Picker.Item value="others" label="Others" />
          </Picker>

          {/* Condition Selection */}
          <Text style={styles.label}>Condition *</Text>
          <View style={styles.optionContainer}>
            {['New', 'Used', 'Needs Repair'].map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[styles.optionButton, formData.conditionType === condition && styles.selectedOption]}
                onPress={() => handleConditionSelection(condition)}
              >
                <Text style={formData.conditionType === condition ? styles.selectedText : styles.optionText}>{condition}</Text>
              </TouchableOpacity>
            ))}
          </View>

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
            {['Diesel', 'Electric', 'Others'].map((fuel) => (
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

          <Text style={styles.label}>Listed By *</Text>
          <View style={styles.optionContainer}>
            {['Dealer', 'Owner'].map((listedByOption) => (
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


export default AddCommercialHeavyMachinery;
