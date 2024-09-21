import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { BASE_URL, TOKEN } from '@env';

const AddCommercialHeavyVehicle = ({ route }) => {
  const { category, subcategory } = route.params;
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuelType: '',
    condition: '',
    owners: '',
    listedBy: '',
    adTitle: '',
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
    console.log(formDataToSend);
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
      console.log(responseData);
      if (response.ok) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Details submitted successfully!',
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.formHeader}>Add: {subcategory.name}</Text>

          {/* Brand Selection */}
          <Text style={styles.label}>Type *</Text>
          <Picker
            selectedValue={formData.brand}
            onValueChange={(value) => handleChange('brand', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item value="auto-rickshaws-&amp;-e-rickshaws" label="Auto-rickshaws &amp; E-rickshaws" />
            <Picker.Item value="buses" label="Buses" />
            <Picker.Item value="trucks" label="Trucks" />
            <Picker.Item value="heavy-machinery" label="Heavy Machinery" />
            <Picker.Item value="modified-jeeps" label="Modified Jeeps" />
            <Picker.Item value="pick-up-vans-/-pick-up-trucks" label="Pick-up vans / Pick-up trucks" />
            <Picker.Item value="scrap-cars" label="Scrap Cars" />
            <Picker.Item value="taxi-cabs" label="Taxi Cabs" />
            <Picker.Item value="tractors" label="Tractors" />
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

          {/* Title Field */}
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
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
    </AlertNotificationRoot>
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


export default AddCommercialHeavyVehicle;
