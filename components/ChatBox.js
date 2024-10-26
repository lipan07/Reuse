import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js/react-native';
import { addEventListener, removeEventListener } from 'react-native-event-listeners';
import { BASE_URL, PUSHER_KEY, PUSHER_CLUSTER } from '@env';

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  encrypted: true
});


const ChatBox = ({ route }) => {
  const { sellerId, buyerId, postId, chatId: existingChatId } = route.params;
  const [chatId, setChatId] = useState(existingChatId || null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (chatId) {
      const subscribedChannel = pusher.subscribe(`chat.${chatId}`);
      subscribedChannel.bind('App\\Events\\MessageSent', (data) => {
        setChatHistory(prev => [...prev, data]);
      });

      setChannel(subscribedChannel);

      return () => {
        subscribedChannel.unbind_all();
        subscribedChannel.unsubscribe();
      };
    }
  }, [chatId]);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setLoggedInUserId(userId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (chatId) {
      fetchChatMessages(chatId);
    } else {
      openChat(sellerId, buyerId, postId);
    }
  }, [chatId]);

  const fetchChatMessages = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/chats/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setChatHistory(data.chats);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const openChat = async (sellerId, buyerId, postId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/open-chat`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ seller_id: sellerId, buyer_id: buyerId, post_id: postId }),
      });
      const data = await response.json();
      setChatId(data.chat.id);
      setChatHistory(data.messages);
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  };

  const handleSend = async (message) => {
    message = message.trim();
    if (!message) return;
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch(`${BASE_URL}/send-message`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ chat_id: chatId, message: message }),
      });
      const data = await response.json();
      // setChatHistory((prev) => [...prev, { message: message, user_id: loggedInUserId }]);
      setInputText('');
      setShowMessageOptions(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMessageOption = (message) => {
    if (message.trim()) {
      handleSend(message);
    }
  };

  const handleMessageText = () => {
    handleSend(inputText); // Pass the input text value to handleSend
  };

  const handleFocus = () => {
    setShowMessageOptions(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 100}
    >
      <ScrollView contentContainerStyle={styles.chatHistory} keyboardShouldPersistTaps='handled'>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.user_id === loggedInUserId ? styles.messageRight : styles.messageLeft,
            ]}
          >
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>

      {showMessageOptions && (
        <View style={styles.messageOptionsContainer}>
          <TouchableOpacity style={styles.messageOption} onPress={() => handleMessageOption('Is it available?')}>
            <Text style={styles.messageOptionText}>Is it available?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageOption} onPress={() => handleMessageOption('What is the last price?')}>
            <Text style={styles.messageOptionText}>What is the last price?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageOption} onPress={() => handleMessageOption('Is it negotiable?')}>
            <Text style={styles.messageOptionText}>Is it negotiable?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageOption} onPress={() => handleMessageOption('Your phone number?')}>
            <Text style={styles.messageOptionText}>Your phone number?</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.footer, Platform.OS === 'ios' && { marginBottom: 20 }]}>
        <TextInput
          style={styles.input}
          value={inputText}
          onFocus={handleFocus}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleMessageText}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatHistory: { padding: 20 },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageLeft: {
    backgroundColor: '#89bed6',
    alignSelf: 'flex-start',
  },
  messageRight: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  messageOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  messageOption: {
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  messageOptionText: {
    color: '#007AFF',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatBox;
