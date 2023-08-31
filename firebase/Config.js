
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBON8BoJa0mGI5LIzqPA3otb85cSsDbQlc",
    authDomain: "chat-app-976d2.firebaseapp.com",
    projectId: "chat-app-976d2",
    storageBucket: "chat-app-976d2.appspot.com",
    messagingSenderId: "578796815032",
    appId: "1:578796815032:web:67fb7655d84214a0f52a4d"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    MESSAGES,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    getAuth,
    signInWithEmailAndPassword,
};