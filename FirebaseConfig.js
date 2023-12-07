import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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



/**
 * 
You are initializing Firebase Auth for React Native without providing
AsyncStorage. Auth state will default to memory persistence and will not
persist between sessions. In order to persist auth state, install the package
"@react-native-async-storage/async-storage" and provide it to
initializeAuth:

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

 */