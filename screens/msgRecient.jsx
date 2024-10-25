import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatList = ({ userId, navigation }) => {
  const [chats, setChats] = useState([]);

  // Obtener todos los chats para el usuario actual
  const fetchChats = async () => {
    const chatSnapshot = await firestore()
      .collection('chats')
      .get(); // Obtiene todos los documentos de la colección `chats`

    const chatData = chatSnapshot.docs.map(doc => {
      const chatInfo = doc.data();

      return {
        chatId: doc.id,
        lastMessageText: chatInfo.text || '',
        lastMessageTime: chatInfo.createdAt,
        user: chatInfo.user,
      };
    });

    setChats(chatData);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // Renderizar la tarjeta de cada chat
  const renderChatCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', { chatId: item.chatId })}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>Chat con: {item.user._id}</Text>
      <Text>{item.lastMessageText}</Text>
      <Text style={{ fontSize: 12, color: 'gray' }}>
        {item.lastMessageTime ? item.lastMessageTime.toDate().toLocaleString() : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.chatId}
      renderItem={renderChatCard}
    />
  );
};

export default ChatList;
