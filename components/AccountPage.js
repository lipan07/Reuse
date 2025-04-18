import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons

const AccountPage = ({ navigation }) => {
    const profileImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Provided profile image URL

    const renderAccountLink = (text, icon, onPress, color) => (
        <TouchableOpacity style={[styles.linkItem, { backgroundColor: '#ffffff' }]} onPress={onPress}>
            <FontAwesome5 name={icon} size={24} color={color} style={styles.icon} />
            <Text style={[styles.linkText, { color: '#000' }]}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfilePage')}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            {/* {renderAccountLink('Followers', 'users', () => navigation.navigate('FollowersPage'), '#4CAF50')} */}
            {renderAccountLink('Following', 'users', () => navigation.navigate('FollowingPage'), '#FF9800')}
            {renderAccountLink('Buy Packages', 'shopping-cart', () => navigation.navigate('PackagePage'), '#FF9800')}
            {renderAccountLink('Settings', 'cog', () => navigation.navigate('Settings'), '#2196F3')}
            {renderAccountLink('Help and Support', 'question-circle', () => { }, '#F44336')}
            {renderAccountLink('Logout', 'sign-out-alt', async () => {
                try {
                    await AsyncStorage.removeItem('authToken');
                    navigation.navigate('Login');
                    console.log('Logged out successfully');
                } catch (error) {
                    console.error('Error logging out:', error);
                }
            }, '#607D8B')}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
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
    editButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4,
    },
    editButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    linkText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        width: 30, // Ensures icon alignment
    },
});

export default AccountPage;
