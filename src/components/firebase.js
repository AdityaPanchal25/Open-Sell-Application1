// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8-mVcTNIjHkVpYkGHx6MulILbJhPb_bs",
  authDomain: "open-sell-3147d.firebaseapp.com",
  projectId: "open-sell-3147d",
  storageBucket: "open-sell-3147d.appspot.com",
  messagingSenderId: "471830268455",
  appId: "1:471830268455:web:73f00fa51941d957375c02",
  measurementId: "G-71MK9ML37M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
