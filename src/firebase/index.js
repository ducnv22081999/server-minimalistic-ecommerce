// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTQCeSMOHS43TIdf3kiSzV0c2_LGdy3YE",
  authDomain: "cloud-minimalistic-ecommerce.firebaseapp.com",
  projectId: "cloud-minimalistic-ecommerce",
  storageBucket: "cloud-minimalistic-ecommerce.appspot.com",
  messagingSenderId: "813915488426",
  appId: "1:813915488426:web:e6fc0b2c374f18e04a90d3",
  measurementId: "G-ZDZ85JWDZ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
