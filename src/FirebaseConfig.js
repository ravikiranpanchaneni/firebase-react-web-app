import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const config = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyCnB1P3Kg-DWj8fvub5E-6CPZ4TnDtuLm4",
  authDomain: "fir-react1-ca8d7.firebaseapp.com",
  projectId: "fir-react1-ca8d7",
  storageBucket: "fir-react1-ca8d7.appspot.com",
  messagingSenderId: "426209960912",
  appId: "1:426209960912:web:e68575bf5c62125e850fd5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;
