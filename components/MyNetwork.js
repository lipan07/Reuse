import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('Following');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    // Add logic to fetch data for the selected tab (e.g., followers or following)
  };

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Following' && styles.activeTab]}
          onPress={() => handleTabChange('Following')}
        >
          <Text style={styles.tabText}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Followers' && styles.activeTab]}
          onPress={() => handleTabChange('Followers')}
        >
          <Text style={styles.tabText}>Followers</Text>
        </TouchableOpacity>
      </View>
      {/* Add logic to render content based on activeTab */}
      {activeTab === 'Following' && (
        <View>
          {/* Display content for Following */}
          <Text>Display Following content here</Text>
        </View>
      )}
      {activeTab === 'Followers' && (
        <View>
          {/* Display content for Followers */}
          <Text>Display Followers content here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tabItem: {
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AccountPage;
