
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBLdRnZzdOJnFeTAbtU7khSjbH7cPZkKzE",
  authDomain: "quick-chat-app-8b476.firebaseapp.com",
  projectId: "quick-chat-app-8b476",
  storageBucket: "quick-chat-app-8b476.appspot.com",
  messagingSenderId: "886421384683",
  appId: "1:886421384683:web:e2d3a3055d30390d40bdae",
  measurementId: "G-M4KJK85Z17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth =getAuth()
export const storage = getStorage();
export const db = getFirestore()