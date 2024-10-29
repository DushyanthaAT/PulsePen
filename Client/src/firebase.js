// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e7f45.firebaseapp.com",
  projectId: "mern-blog-e7f45",
  storageBucket: "mern-blog-e7f45.appspot.com",
  messagingSenderId: "669660739938",
  appId: "1:669660739938:web:7a86db09e0a4e84215943b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
