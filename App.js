import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, query, onSnapshot, orderBy } from './firebase/Config';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';
import Login from './screens/Login';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES),orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages= []

      querySnapshot.forEach((doc) => {

        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))

    setNewMessage('')
    
  }

  if (logged) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {
            messages.map((message) =>(
              <View style={styles.message} key={message.id}>
                <Text style={styles.messageInfo}>{message.created}</Text>
                <Text>{message.text}</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-around'}}>
          <TextInput style= {{flex: 0.75}} placeholder='Send message...' value={newMessage} onChangeText></TextInput>
          <Button style={{flex: 0.25}} title="Send" type="button"onPress={save}></Button>
        </View>
      </SafeAreaView>
    );
   } else {
    return <Login setLogin={setLogged}></Login>
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12
  },
});
