import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { firebaseConfig } from "./firebaseConfig.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHhdshiFlIfD_exI9anVrk7f1t1IHeZlo",
    authDomain: "happi-scraper.firebaseapp.com",
    projectId: "happi-scraper",
    storageBucket: "happi-scraper.appspot.com",
    messagingSenderId: "8975390143",
    appId: "1:8975390143:web:45957dc977f756fdc9bd0a",
    measurementId: "G-T36B8V7LP7"
  };
  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
