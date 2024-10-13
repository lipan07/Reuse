import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
import Pusher from 'pusher-js/react-native';
import { BASE_URL, TOKEN, PUSHER_KEY, PUSHER_CLUSTER } from '@env';

const Token = TOKEN;
const PusherKey = PUSHER_KEY;
const PusherCluster = PUSHER_CLUSTER;
const chatID = '9d3cdd00-e664-4468-9ac8-0cdc889d84bf';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'multipart/form-data',
  'Authorization': `Bearer ${Token}`,
};

const ChatBox = ({ route }) => {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');

  // Function to fetch chat messages
  const fetchChatHistory = async () => {
    console.log(`${BASE_URL}/chats/${chatID}`);
    try {
      const response = await fetch(`${BASE_URL}/chats/${chatID}`, {
        method: 'GET',
        headers: headers,
      });

      const responseData = await response.json();
      console.log(responseData);
      setChatHistory(responseData.chats); // Set the chat history with the fetched messages
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  // Initialize Laravel Echo with Pusher
  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'pusher',
      client: new Pusher(PusherKey, {
        cluster: PusherCluster,
        encrypted: true,
        authEndpoint: `${BASE_URL}/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      }),
    });
    // Subscribe to the chat channel
    const channel = echo.channel(`chat.${chatID}`); // Subscribe to the specific chat channel
    channel.listen('MessageSent', (e) => {
      // Add the received message to the chat history
      setChatHistory((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      // channel.unbind(); // Unsubscribe on cleanup
      echo.disconnect(); // Disconnect Echo on component unmount
    };
  }, []);

  // Handle sending a message
  const handleSend = async () => {
    if (inputText.trim() !== '') {
      const formDataToSend = new FormData();
      const messageData = {
        chat_id: chatID, // Assuming chat_id is passed through navigation params
        sender_id: '9d3afef1-d5fc-4ca3-ac68-c118be8b0661', // Assuming user_id is passed through navigation params
        message: inputText,
      };

      // Set up your form data
      formDataToSend.append('post_id', '9d3b02c8-34fc-4cd8-8464-1cdaf22cd4c8');
      formDataToSend.append('sender_id', '9d3afef1-d5fc-4ca3-ac68-c118be8b0661'); // Use dynamic sender ID
      formDataToSend.append('receiver_id', '9d3afef1-d5fc-4ca3-ac68-c118be8b0661'); // Update receiver ID
      formDataToSend.append('message', inputText);

      try {
        const response = await fetch(`${BASE_URL}/chats`, {
          method: 'POST',
          body: formDataToSend,
          headers: headers,
        });

        const responseData = await response.json();
        console.log(responseData);

        // Clear input after sending
        setInputText('');
      } catch (error) {
        console.error('Failed to save message:', error);
      }
    }
  };

  const handleMessageOption = (message) => {
    setInputText(message); // Set the selected message option in the input field
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handleDismissKeyboard}>
      <ScrollView style={styles.chatHistory} contentContainerStyle={{ paddingBottom: 20 }}>
        {chatHistory.map((chat, index) => (
          <Text key={index} style={styles.chatMessage}>{chat.message}</Text>
        ))}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: keyboardHeight }]}>
        <View style={styles.messageOptionsContainer}>
          {showMessageOptions && (
            <View style={styles.messageOptions}>
              <TouchableOpacity onPress={() => handleMessageOption('Is it available?')}>
                <Text style={styles.messageOption}>Is it available?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('What is the last price?')}>
                <Text style={styles.messageOption}>What is the last price?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('Is it negotiable?')}>
                <Text style={styles.messageOption}>Is it negotiable?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('Your phone number?')}>
                <Text style={styles.messageOption}>Your phone number?</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.inputSection}>
          <TouchableOpacity onPress={() => inputRef.current?.focus()} style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Type a message..."
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              onFocus={() => setShowMessageOptions(true)}
              onBlur={() => setShowMessageOptions(false)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar navigation={navigation} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatHistory: {
    flex: 1,
    padding: 10,
  },
  chatMessage: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    padding: 10,
    marginBottom: 80,
  },
  messageOptionsContainer: {
    maxHeight: 100,
    overflow: 'hidden',
  },
  messageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  messageOption: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCCCCC',
    backgroundColor: '#F5F5F5',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#007AFF',
  },
});

export default ChatBox;
