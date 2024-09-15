import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icons
import { useNavigation } from '@react-navigation/native';

const Header = () => {
   const navigation = useNavigation();
   const [showAddressModal, setShowAddressModal] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState('Kolkata');
   const [newAddress, setNewAddress] = useState('');
   const [addresses, setAddresses] = useState([
      { id: '1', name: 'Kolkata- Agarpara' },
      { id: '2', name: 'Kolkata- Sodepur' },
      { id: '3', name: 'Kolkata- Barrackpore' },
   ]);

   return (
      <>
         <StatusBar backgroundColor="#007BFF" barStyle="light-content" />
         <View style={styles.headerContainer}>
            {/* Logo and Title */}
            <Image
               source={{ uri: 'https://i.pinimg.com/originals/92/4c/af/924cafad941065f4d5c03ca5423bfcd3.gif' }}
               style={styles.logo}
            />
            <Text style={styles.title}>Reuse</Text>

            {/* Right-side icons */}
            <View style={styles.rightIcons}>
               {/* Location Icon */}
               <TouchableOpacity onPress={() => setShowAddressModal(true)}>
                  <Ionicons name="location-outline" size={24} color="#fff" style={styles.icon} />
               </TouchableOpacity>

               {/* User Icon */}
               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
               </TouchableOpacity>
            </View>
         </View>

         <Modal visible={showAddressModal} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Select Address</Text>
                  <FlatList
                     data={addresses}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           style={styles.addressCard}
                           onPress={() => {
                              setSelectedAddress(item.name);
                              setShowAddressModal(false);
                           }}
                        >
                           <Text>{item.name}</Text>
                        </TouchableOpacity>
                     )}
                     keyExtractor={(item) => item.id}
                     horizontal={true}
                     contentContainerStyle={styles.addressesContainer}
                  />
                  <View style={styles.newAddressInput}>
                     <TextInput
                        style={styles.newAddressTextInput}
                        placeholder="Add New Address"
                        onChangeText={setNewAddress}
                        value={newAddress}
                     />
                     <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                           if (newAddress.trim()) {
                              setAddresses([...addresses, { id: String(addresses.length + 1), name: newAddress }]);
                              setNewAddress('');
                           }
                        }}
                     >
                        <Text style={styles.addButtonText}>Add</Text>
                     </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setShowAddressModal(false)}>
                     <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      </>
   );
};

const styles = StyleSheet.create({
   headerContainer: {
      backgroundColor: '#007BFF',
      height: Platform.OS === 'ios' ? 80 : 60,
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 40 : 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Space between title and icons
   },
   logo: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginRight: 10,
   },
   title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FFFFFF',
   },
   rightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   icon: {
      marginLeft: 15, // Space between the icons
   },
   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
   modalContent: { backgroundColor: '#FFF', borderRadius: 10, padding: 20, width: '90%' },
   modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
   addressCard: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, marginRight: 10 },
   addressesContainer: { paddingBottom: 20 },
   newAddressInput: { flexDirection: 'row', marginTop: 10 },
   newAddressTextInput: { flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 },
   addButton: { backgroundColor: '#007bff', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 5, marginLeft: 10 },
   addButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
   closeButton: { marginTop: 20, fontSize: 16, color: '#007bff', textAlign: 'center' },
});

export default Header;
