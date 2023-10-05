// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChMOHysIsVgCdswsn2SSCn-4rfTJVkM1w",
  authDomain: "lernr-5ec94.firebaseapp.com",
  projectId: "lernr-5ec94",
  storageBucket: "lernr-5ec94.appspot.com",
  messagingSenderId: "226286247478",
  appId: "1:226286247478:web:cbf364ba908ca84475c297",
  measurementId: "G-PEQ1668RLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)