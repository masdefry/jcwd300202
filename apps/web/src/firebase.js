// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfe8dUtTkdirwR-i1QqYp_s02sL-ab9tA",
  authDomain: "roomify-inc.firebaseapp.com",
  projectId: "roomify-inc",
  storageBucket: "roomify-inc.firebasestorage.app",
  messagingSenderId: "681514012220",
  appId: "1:681514012220:web:05d5339747545c3bcd7d39",
  measurementId: "G-PEJXQMDDXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);