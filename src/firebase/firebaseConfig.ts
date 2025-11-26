// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBhQm9SbOFEjg1Hx1Ic0yblRffnrJCZV00",
  authDomain: "wyvernstore-2af05.firebaseapp.com",
  projectId: "wyvernstore-2af05",
  storageBucket: "wyvernstore-2af05.firebasestorage.app",
  messagingSenderId: "780158520034",
  appId: "1:780158520034:web:7177762f5710490ca2acbb",
  measurementId: "G-EWTKNWKGE7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // EXPORTAMOS Firestore
