// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCeQ8LQxjIqN2cPVG_FOxgHAItfPCd0mhk",
    authDomain: "library-e609e.firebaseapp.com",
    projectId: "library-e609e",
    storageBucket: "library-e609e.appspot.com",
    messagingSenderId: "964891211691",
    appId: "1:964891211691:web:15fad5bd71f9fe299984ee",
    databaseURL: "https://library-e609e-default-rtdb.firebaseio.com"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);