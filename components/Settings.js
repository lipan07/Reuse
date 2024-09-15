import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SettingsPage = () => {
    const handlePasswordChange = () => {
        // Logic for changing password
    };

    const handleDeleteAccount = () => {
        // Logic for deleting account
    };

    const handleLogoutAllDevices = () => {
        // Logic for logging out from all devices
    };

    const handleLogout = () => {
        // Logic for logging out
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.link} onPress={handlePasswordChange}>
                <Text style={styles.linkText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleDeleteAccount}>
                <Text style={styles.linkText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleLogoutAllDevices}>
                <Text style={styles.linkText}>Logout from All Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link} onPress={handleLogout}>
                <Text style={styles.linkText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    link: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        width: '100%',
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
    },
});

export default SettingsPage;
