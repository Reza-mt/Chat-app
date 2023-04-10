import firebase from "firebase/app";
import 'firebase/auth';

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyDLI0EPt7_aPboO8rdftYHviqAuEbbSl3E",
    authDomain: "mtgram-b0286.firebaseapp.com",
    projectId: "mtgram-b0286",
    storageBucket: "mtgram-b0286.appspot.com",
    messagingSenderId: "116178762525",
    appId: "1:116178762525:web:6aaadbe2eb70e5998e7ff4"
  }).auth();