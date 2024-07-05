// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC1-L8P8SuY8xSC-kK3rIcvgY0pabB8kTI",
    authDomain: "smthelmet.firebaseapp.com",
    databaseURL: "https://smthelmet-default-rtdb.firebaseio.com",
    projectId: "smthelmet",
    storageBucket: "smthelmet.appspot.com",
    messagingSenderId: "389559894480",
    appId: "1:389559894480:web:7808c9b34db8ff1774f9d5",
    measurementId: "G-R61P9M2T44"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
