// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClIlC-AU7TEfM3IPtt-C_4NjbMhFdE78E",
  authDomain: "documed-cb362.firebaseapp.com",
  projectId: "documed-cb362",
  storageBucket: "documed-cb362.appspot.com",
  messagingSenderId: "127458849138",
  appId: "1:127458849138:web:4a76e6940b657f2a206deb",
  measurementId: "G-KNS6Q17H76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);