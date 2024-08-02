import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD_qRTXymxDTFi4nQyXZ0oIYrk8jV3D1vI",
    authDomain: "project-manager-4f94a.firebaseapp.com",
    projectId: "project-manager-4f94a",
    storageBucket: "project-manager-4f94a.appspot.com",
    messagingSenderId: "745552431838",
    appId: "1:745552431838:web:7958bf55cc49c5d2bb104f"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const projectAuth = firebase.auth();
const storage = firebase.storage()
const timestamp = firebase.firestore.Timestamp

export  {db, projectAuth, storage, timestamp}
