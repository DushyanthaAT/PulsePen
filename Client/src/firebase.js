// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-test-c691b.firebaseapp.com",
  projectId: "fir-test-c691b",
  storageBucket: "fir-test-c691b.appspot.com",
  messagingSenderId: "426646652568",
  appId: "1:426646652568:web:f85a3d7b7c6fa62d9cf2ed",
  measurementId: "G-NEZBPCTHEN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);