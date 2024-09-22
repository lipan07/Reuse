import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountPage = ({ navigation }) => {
    const profileImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Provided profile image URL

    const renderAccountLink = (text, icon, onPress) => (
        <TouchableOpacity style={styles.linkItem} onPress={onPress}>
            <FontAwesome5 name={icon} size={24} color="black" style={styles.icon} />
            <Text style={styles.linkText}>{text}</Text>
        </TouchableOpacity>
    );

    // Navigation functions
    const navigateToEditProfile = () => navigation.navigate('EditProfilePage');
    const handleMyNetwork = () => { navigation.navigate('MyNetwork') };
    const handleBuyPackages = () => { navigation.navigate('PackagePage') };
    const handleSettings = () => { navigation.navigate('Settings') };
    const handleHelpAndSupport = () => { };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            navigation.navigate('Login')
            console.log('Logged out successfully');
            // Optionally, navigate to the login screen or perform other actions
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.profileSection}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <TouchableOpacity onPress={navigateToEditProfile}>
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                {renderAccountLink('My Network', 'users', handleMyNetwork)}
                {renderAccountLink('Buy Packages', 'shopping-cart', handleBuyPackages)}
                {renderAccountLink('Settings', 'cog', handleSettings)}
                {renderAccountLink('Help and Support', 'question-circle', handleHelpAndSupport)}
                {renderAccountLink('Logout', 'sign-out-alt', handleLogout)}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F5F5F5', // Adjust background color as needed
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white', // Set the link item background color
        padding: 10,
        borderRadius: 8,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default AccountPage;
