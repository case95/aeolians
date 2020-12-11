import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
const dbaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // "aeolians-86d4b.appspot.com" /**/,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(dbaseConfig);
// Intialize Firestore
firebaseApp.firestore();

const firebaseStorage = firebase.storage();

export { firebaseApp, firebaseStorage };
