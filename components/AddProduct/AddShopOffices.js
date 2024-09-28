import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { submitForm } from '../../service/apiService';

const AddShopOffices = ({ route }) => {
    const { category, subcategory } = route.params;
    const [formData, setFormData] = useState({
        furnishing: '',
        constructionStatus: '',
        listedBy: '',
        carParking: '',
        superBuiltUpArea: '',
        carpetArea: '',
        maintenance: '',
        washroom: '',
        projectName: '',
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

    const handleOptionSelection = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setFormData({ ...formData, images: result.assets.map(asset => asset.uri) });
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
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
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

                    {/* Construction Status */}
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

                    {/* Listed By */}
                    <Text style={styles.label}>Listed By *</Text>
                    <View style={styles.optionContainer}>
                        {['Builder', 'Dealer', 'Owner'].map((option) => (
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
                        {['1', '2', '3', '3+'].map((option) => (
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

                    {/* Super Built-up Area */}
                    <Text style={styles.label}>Super Built-up Area (ft²) *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Super Built-up Area"
                        keyboardType="numeric"
                        value={formData.superBuiltUpArea}
                        onChangeText={(value) => handleChange('superBuiltUpArea', value)}
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

                    {/* Maintenance */}
                    <Text style={styles.label}>Maintenance (Monthly)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Maintenance"
                        keyboardType="numeric"
                        value={formData.maintenance}
                        onChangeText={(value) => handleChange('maintenance', value)}
                    />

                    {/* Washrooms */}
                    <Text style={styles.label}>Washrooms</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Number of Washrooms"
                        keyboardType="numeric"
                        value={formData.washroom}
                        onChangeText={(value) => handleChange('washroom', value)}
                    />

                    {/* Project Name */}
                    <Text style={styles.label}>Project Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Project Name"
                        value={formData.projectName}
                        onChangeText={(value) => handleChange('projectName', value)}
                    />

                    {/* Ad Title */}
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
                    <View style={styles.imageContainer}>
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
        </>
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
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 8,
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

export default AddShopOffices;
