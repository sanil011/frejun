// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6wipvs3KnpmcLF_Rk5ZKYgh7kfKe3nVs",
    authDomain: "frejun-d7ebc.firebaseapp.com",
    projectId: "frejun-d7ebc",
    storageBucket: "frejun-d7ebc.appspot.com",
    messagingSenderId: "867672238779",
    appId: "1:867672238779:web:8cde02f099edb45d32579e",
    measurementId: "G-1Z71X83JWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)