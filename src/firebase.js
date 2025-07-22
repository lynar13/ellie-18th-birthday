// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage,ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlT-iwd0yoU43kJQx0RpYL_G4EdE0Ck0k",
  authDomain: "ashley-18th.firebaseapp.com",
  projectId: "ashley-18th",
  storageBucket: "ashley-18th.firebasestorage.app",
  messagingSenderId: "941575344494",
  appId: "1:941575344494:web:6851c9325a26787c2a717f",
  measurementId: "G-7JNKXV1W5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get references to the services you'll use
const storage = getStorage(app);

// Get a reference to the default storage bucket
const storageRef = ref(storage);

// Get a reference to a file path in the bucket
const imagesRef = ref(storage, 'images'); // Refers to the 'images' directory
const fileRef = ref(storage, 'images/my-photo.jpg'); // Refers to a specific file

// Initialize Firestore and export it
const db = getFirestore(app);
export { db, app, storage };