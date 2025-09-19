// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage,ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn7-TQX0megJXenl_3IRt0XPdkilg_K2g",
  authDomain: "ellie-18th.firebaseapp.com",
  projectId: "ellie-18th",
  storageBucket: "ellie-18th.firebasestorage.app",
  messagingSenderId: "1076269212695",
  appId: "1:1076269212695:web:fff3cee69974f565966852",
  measurementId: "G-75CWTN2KC8",
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