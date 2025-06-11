// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGXVmZS4QPbWICTIu3d4EcSayjIyHmDjk",
  authDomain: "save-the-date-c9495.firebaseapp.com",
  projectId: "save-the-date-c9495",
  storageBucket: "save-the-date-c9495.appspot.com",
  messagingSenderId: "67229939890",
  appId: "1:67229939890:web:9962200799b9c49c3131ab",
  measurementId: "G-2LM34XJJJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);
export { db };