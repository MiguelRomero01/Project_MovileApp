import React, {
    useState,
    useLayoutEffect,
    useCallback
  } from 'react';

  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';

  import { auth, database } from '../config/firebase';
  import { useNavigation } from '@react-navigation/native';

  import colors from '../colors';


  export default function Chat() {

    const [messages, setMessages] = useState([]);
    useLayoutEffect(() => {

        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );

        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);

      return (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
}

