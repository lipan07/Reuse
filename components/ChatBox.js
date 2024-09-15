import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { useNavigation } from '@react-navigation/native';

const ChatBox = () => {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      setShowMessageOptions(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setShowMessageOptions(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMessageOption = (message) => {
    const updatedChatHistory = [...chatHistory, { id: chatHistory.length + 1, message }];
    setChatHistory(updatedChatHistory);
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const updatedChatHistory = [...chatHistory, { id: chatHistory.length + 1, message: inputText }];
      setChatHistory(updatedChatHistory);
      setInputText(''); // Clear input after sending
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handleDismissKeyboard}>
      <ScrollView style={styles.chatHistory} contentContainerStyle={{ paddingBottom: 20 }}>
        {chatHistory.map((chat) => (
          <Text key={chat.id} style={styles.chatMessage}>{chat.message}</Text>
        ))}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: keyboardHeight }]}>
        <View style={styles.messageOptionsContainer}>
          {showMessageOptions && (
            <View style={styles.messageOptions}>
              <TouchableOpacity onPress={() => handleMessageOption('Is it available')}>
                <Text style={styles.messageOption}>Is it available?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('Is it available')}>
                <Text style={styles.messageOption}>What is the last price?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('Is it available')}>
                <Text style={styles.messageOption}>Is it negotiable?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMessageOption('Is it available')}>
                <Text style={styles.messageOption}>Your phone no?</Text>
              </TouchableOpacity>
              {/* Add other message options similarly */}
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
