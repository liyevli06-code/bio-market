// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SƏNİN_API_KEY",
  authDomain: "bio-market-delta.firebaseapp.com",
  projectId: "bio-market-delta",
  storageBucket: "bio-market-delta.firebasestorage.app",
  messagingSenderId: "756462281870",
  appId: "1:756462281870:web:0c3eabe460f6dafcbc95df"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
