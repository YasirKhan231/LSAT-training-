// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS-JxpH64yOmKPyPna2bvaPBRvN1YPR9w",
  authDomain: "lsat-training.firebaseapp.com",
  projectId: "lsat-training",
  storageBucket: "lsat-training.firebasestorage.app",
  messagingSenderId: "246528416602",
  appId: "1:246528416602:web:6990a686d5bb8b8f44f163",
  measurementId: "G-P57K2ZKTML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);