import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADy9N7Ep6p6cUK2tfFA5NG-tEEC19JTjo",
  authDomain: "closecall-b0ad5.firebaseapp.com",
  databaseURL: "https://closecall-b0ad5-default-rtdb.firebaseio.com",
  projectId: "closecall-b0ad5",
  storageBucket: "closecall-b0ad5.appspot.com",
  messagingSenderId: "384148407241",
  appId: "1:384148407241:web:78590bf200c6876fa25e18"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);