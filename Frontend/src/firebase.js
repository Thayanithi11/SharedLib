
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmzDzokAAIZJhR0HaNLlVdDTryQtos0AQ",
  authDomain: "sharedlib-bc490.firebaseapp.com",
  projectId: "sharedlib-bc490",
  storageBucket: "sharedlib-bc490.firebasestorage.app",
  messagingSenderId: "808463686509",
  appId: "1:808463686509:web:c30ef49d34f127891a9864",
  measurementId: "G-0DQJHC6VYW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);