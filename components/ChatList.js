import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNavBar from './BottomNavBar';

// Example chat data (replace this with your actual chat data)
const chatData = [
  { id: '1', user: 'Shalom', message: 'Hi there!' },
  { id: '2', user: 'Nosson', message: 'Hello!' },
  { id: '3', user: 'John', message: 'Hello!' },
  { id: '4', user: 'Mohsin', message: 'Hello!' },
  { id: '5', user: 'Ari', message: 'Hello!' },
  // More chat items...
];

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch or set your chat data here
    setChats(chatData); // For example, setting chat data from state
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatBox', { chatId: item.id })}
    >
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 50,
  },
  chatItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#555555',
  },
});

export default ChatList;
